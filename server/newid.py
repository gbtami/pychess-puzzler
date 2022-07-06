import random
import string

ID_CHARS = string.ascii_letters + string.digits


def id5():
    return "".join(random.choice(ID_CHARS) for x in range(5))


def id8():
    return "".join(random.choice(ID_CHARS) for x in range(8))


async def new_id(table):
    if table is None:
        return id5()

    while True:
        new_id = id5()
        existing = await table.find_one({"_id": {"$eq": new_id}})
        if not existing:
            return new_id
