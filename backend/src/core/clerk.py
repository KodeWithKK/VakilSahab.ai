import requests
from fastapi import HTTPException, Request
from jose import jwt
from src.core.config import settings


def get_jwks():
    JWKS_URL = f"{settings.CLERK_FRONTEND_API_URL}/.well-known/jwks.json"
    return requests.get(JWKS_URL).json()


def get_public_key(token: str):
    headers = jwt.get_unverified_header(token)
    jwks = get_jwks()
    for key in jwks["keys"]:
        if key["kid"] == headers["kid"]:
            return key
    raise HTTPException(status_code=401, detail="Public key not found.")


async def get_user_id(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid Authorization header"
        )

    token = auth_header.split(" ")[1]

    try:
        public_key = get_public_key(token)
        payload = jwt.decode(
            token,
            key=public_key,
            algorithms=public_key["alg"],
            audience=settings.CLERK_FRONTEND_API_URL,
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

    user_id = payload.get("sub")
    return user_id
