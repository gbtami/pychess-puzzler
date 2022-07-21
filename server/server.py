import json
import os
from urllib.parse import urlparse

from aiohttp import web
import aiohttp_session

from aiohttp_session.cookie_storage import EncryptedCookieStorage
from aiohttp_session import setup

from motor import motor_asyncio as ma
from pymongo.errors import DuplicateKeyError

import pyffish as sf

from login import login, logout, oauth, USERS

from settings import (
    MAX_AGE,
    SECRET_KEY,
    URI,
    PYCHESS_URI,
    STATIC_ROOT,
    MONGO_HOST,
    MONGO_DB_NAME,
)


def html(model):
    file_path = os.path.dirname(__file__)
    templ = ""
    with open(os.path.join(file_path, "template.html"), "r") as f:
        templ = f.read()
    return templ % model


async def init_db(app):
    app["client"] = ma.AsyncIOMotorClient(
        MONGO_HOST,
        tz_aware=True,
    )
    app["db"] = app["client"][MONGO_DB_NAME]
    app["skipped"] = []
    app["users"] = dict([(user, {"variant": "chess", "skipped": [], "all": False}) for user in USERS])

    await app["db"].puzzle.create_index("fen", unique=True)


async def shutdown(app):
    app["client"].close()


def filter_expr(all_puzzle: bool, skipped: list, variant: str):
    f = {
        "$and": [
            {"variant": variant},
        ]
    }
    if not all_puzzle:
        f["$and"].append({"review": {"$exists": all_puzzle}})
    if skipped:
        f["$and"] += [{"_id": {"$ne": _id}} for _id in skipped]
    return f


async def review_puzzle(request):
    _id = request.match_info.get("id")
    approved = request.rel_url.query.get("approved")
    moves = request.rel_url.query.get("moves")
    print(
        await request.app["db"].puzzle.find_one_and_update(
            {"_id": _id}, {"$set": {"review": approved == "1", "moves": moves}}
        )
    )
    response = await next_puzzle(request)
    return response


async def get_puzzle(request):
    _id = request.match_info.get("id")
    puzzle = await request.app["db"].puzzle.find_one({"_id": _id})
    response = await render_puzzle(request, puzzle)
    return response


async def skip_puzzle(request):
    session = await aiohttp_session.get_session(request)
    session_user = session.get("user_name")
    if session_user is None:
        return web.HTTPFound("/login")

    skipped = request.rel_url.query.get("skipped")
    user = request.app["users"][session_user]
    user["skipped"].append(skipped)
    response = await next_puzzle(request)
    return response


async def next_puzzle(request):
    session = await aiohttp_session.get_session(request)
    session_user = session.get("user_name")
    if session_user is None:
        return web.HTTPFound("/login")

    user = request.app["users"][session_user]
    puzzle_filter = filter_expr(user["all"], user["skipped"], user["variant"])
    puzzle = await request.app["db"].puzzle.find_one(puzzle_filter, sort=[("$natural", -1)])

    if user["all"] and len(user["skipped"]) > 0 and puzzle is None:
        user["skipped"] = []
        puzzle = await request.app["db"].puzzle.find_one(puzzle_filter, sort=[("$natural", -1)])

    response = await render_puzzle(request, puzzle)
    return response


async def render_puzzle(request, puzzle):
    # Who made the request?
    session = await aiohttp_session.get_session(request)
    session_user = session.get("user_name")
    if session_user is None:
        return web.HTTPFound("/login")

    user = request.app["users"][session_user]

    model = (
        puzzle
        if puzzle is not None
        else {
            "_id": "0",
            "variant": user["variant"],
            "fen": sf.start_fen(user["variant"]),
            "moves": "",
        }
    )
    model["home"] = URI
    model["pychessURL"] = PYCHESS_URI
    model["assetURL"] = STATIC_ROOT
    model["username"] = session_user
    model["all"] = user["all"]
    return web.Response(text=html(json.dumps(model)), content_type="text/html")


async def set_variant(request):
    session = await aiohttp_session.get_session(request)
    session_user = session.get("user_name")
    data = await request.post()
    print("set_variant()", data)
    user = request.app["users"][session_user]
    user["variant"] = data["variant"]
    response = await next_puzzle(request)
    return response


async def set_all(request):
    session = await aiohttp_session.get_session(request)
    session_user = session.get("user_name")
    data = await request.post()
    print("set_all()", data)
    user = request.app["users"][session_user]
    user["all"] = "all" in data and data["all"] == "on"
    response = await next_puzzle(request)
    return response


async def add_puzzle(request):
    puzzle = await request.post()
    try:
        await app["db"].puzzle.insert_one(dict(puzzle))
        return web.json_response({"status": "OK"})
    except DuplicateKeyError:
        return web.json_response({"error": "DuplicateKeyError"})


def make_app():
    app = web.Application()

    parts = urlparse(URI)
    setup(
        app,
        EncryptedCookieStorage(SECRET_KEY, max_age=MAX_AGE, secure=parts.scheme == "https"),
    )

    app.on_startup.append(init_db)
    app.on_shutdown.append(shutdown)

    app.router.add_get("/", next_puzzle)
    app.router.add_get("/review/{id}", review_puzzle)
    app.router.add_get("/skip", skip_puzzle)
    app.router.add_get("/puzzle/{id}", get_puzzle)
    app.router.add_get("/login", login)
    app.router.add_get("/oauth", oauth)
    app.router.add_get("/logout", logout)
    app.router.add_post("/variant", set_variant)
    app.router.add_post("/all", set_all)
    app.router.add_post("/puzzle", add_puzzle)
    app.router.add_static("/static", "static", append_version=True)

    return app


if __name__ == "__main__":
    sf.set_option("VariantPath", "variants.ini")

    app = make_app()
    web.run_app(app, port=int(os.environ.get("PORT", 8080)))
