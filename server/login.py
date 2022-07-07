import logging
import secrets
import hashlib
import base64
from urllib.parse import urlencode

import aiohttp
from aiohttp import web
import aiohttp_session

from settings import (
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REDIRECT_PATH,
    LICHESS_OAUTH_AUTHORIZE_URL,
    LICHESS_OAUTH_TOKEN_URL,
    LICHESS_ACCOUNT_API_URL,
)

log = logging.getLogger(__name__)


USERS = [
    "e-pluszak",
    "Entitled_Untitled",
    "Licetus",
    "SmartAlice",
    "nello726",
    "Illion",
    "BortElGrasitas",
    "okei",
    "LegionDestroyer",
    "visualdennis",
    "furumin999",
    "JarlCarlander",
    "ubdip",
    "CouchTomato87",
    "gbtami",
]


async def oauth(request):
    """Get lichess.org oauth token with PKCE"""
    print("oauth()")
    session = await aiohttp_session.get_session(request)
    code = request.rel_url.query.get("code")

    if code is None:
        code_verifier = secrets.token_urlsafe(64)
        session["oauth_code_verifier"] = code_verifier
        code_challenge = get_code_challenge(code_verifier)

        authorize_url = (
            LICHESS_OAUTH_AUTHORIZE_URL
            + "/?"
            + urlencode(
                {
                    "state": CLIENT_SECRET,
                    "client_id": CLIENT_ID,
                    "response_type": "code",
                    "redirect_uri": REDIRECT_URI,
                    "code_challenge": code_challenge,
                    "code_challenge_method": "S256",
                }
            )
        )
        return web.HTTPFound(authorize_url)
    else:
        state = request.rel_url.query.get("state")
        if state != CLIENT_SECRET:
            log.error("State got back from %s changed", LICHESS_OAUTH_AUTHORIZE_URL)
            return web.HTTPFound("/")

        if "oauth_code_verifier" not in session:
            log.error("No oauth_code_verifier in session")
            return web.HTTPFound("/")

        data = {
            "grant_type": "authorization_code",
            "code": code,
            "code_verifier": session["oauth_code_verifier"],
            "client_id": CLIENT_ID,
            "redirect_uri": REDIRECT_URI,
        }

        async with aiohttp.ClientSession() as client_session:
            async with client_session.post(LICHESS_OAUTH_TOKEN_URL, json=data) as resp:
                data = await resp.json()
                token = data.get("access_token")
                if token is not None:
                    session["token"] = token
                    # TODO: "expires_in": 5270400
                    return web.HTTPFound("/login")
                else:
                    log.error(
                        "Failed to get lichess OAuth token from %s",
                        LICHESS_OAUTH_TOKEN_URL,
                    )
                    return web.HTTPFound("/")


async def login(request):
    """Login with lichess.org oauth."""
    print("login()")
    print(1)
    if REDIRECT_PATH is None:
        print(2)
        log.error("Set REDIRECT_PATH env var if you want lichess OAuth login!")
        return web.HTTPFound("/")

    session = await aiohttp_session.get_session(request)

    if "token" not in session:
        print(3)
        return web.HTTPFound(REDIRECT_PATH)

    username = None

    async with aiohttp.ClientSession() as client_session:
        print(4)
        data = {"Authorization": "Bearer %s" % session["token"]}
        async with client_session.get(LICHESS_ACCOUNT_API_URL, headers=data) as resp:
            data = await resp.json()
            username = data.get("username")
            if username is None:
                print(5)
                log.error(
                    "Failed to get lichess public user account data from %s",
                    LICHESS_ACCOUNT_API_URL,
                )
                return web.HTTPFound("/")
            elif username not in USERS:
                print(6)
                del session["token"]
                return web.HTTPFound("/")

    log.info("+++ Lichess authenticated user: %s", username)
    session["user_name"] = username
    print(7)

    if username:
        del session["token"]

    return web.HTTPFound("/")


async def logout(request):
    session = await aiohttp_session.get_session(request)
    session.invalidate()
    return web.HTTPFound("/")


def get_code_challenge(code_verifier):
    hashed = hashlib.sha256(code_verifier.encode("ascii")).digest()
    encoded = base64.urlsafe_b64encode(hashed)
    return encoded.decode("ascii")[:-1]
