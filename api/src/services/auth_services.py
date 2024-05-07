from passlib.context import CryptContext
import passlib.hash as hash
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt


load_dotenv()
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

async def verify_password(plain_password, hashed_password):
    return hash.bcrypt.verify(plain_password.encode('utf-8'), hashed_password)

async def get_password_hash(password):
    return hash.bcrypt.hash(password.encode('utf-8'))

async def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt