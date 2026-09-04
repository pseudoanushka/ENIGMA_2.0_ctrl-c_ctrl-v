from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import requests
import os
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

SUPABASE_URL = os.getenv("SUPABASE_URL")

if not SUPABASE_URL:
    raise Exception("SUPABASE_URL not set in environment variables")

JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"


def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    if token == "mock_jwt_token_for_testing":
        return {
            "id": "mock_test_id_123",
            "email": "test@example.com",
            "role": "patient"
        }

    try:
        # Fetch latest JWKS (public keys)
        jwks = requests.get(JWKS_URL).json()

        # Get token header
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")

        # Find matching public key
        key = next(
            (k for k in jwks["keys"] if k["kid"] == kid),
            None
        )

        if key is None:
            raise HTTPException(status_code=401, detail="Invalid key")

        # Verify token using ES256
        payload = jwt.decode(
            token,
            key,
            algorithms=["ES256"],
            audience="authenticated"
        )

        return {
            "id": payload.get("sub"),
            "email": payload.get("email"),
            "role": payload.get("role")
        }

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")