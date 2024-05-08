from passlib.context import CryptContext
import passlib.hash as hash
import os, db
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Security, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer
from jose import jwt, JWTError

load_dotenv('.env.api')

security = HTTPBearer()
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme_user = OAuth2PasswordBearer(tokenUrl="/user/login")

async def register_user(user_data):
    find_user = await get_user_by_email(user_data.user_email)
    cursor = db.conn.cursor()
    if not find_user:
        user_query = f"""
            INSERT INTO app_user (app_user_name, app_user_email, app_user_password, app_user_create_date)
            VALUES (%s, %s, %s, %s);
        """
        user_query_parameters = (user_data.user_name,
                            user_data.user_email,
                            await get_password_hash(user_data.user_password),
                            datetime.now().date())
        cursor.execute(user_query,user_query_parameters)
        db.conn.commit()
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User email exists"
        )

async def login_user(user_data):
    find_user = await get_user_by_email(user_data.username)
    if not find_user:
        raise HTTPException(status_code = 401, detail="Could not validate credentials", 
                            headers={"WWW-Authenticate":"Bearer"})        
    if not await verify_password(user_data.password, find_user['app_user_password']):
        raise HTTPException(status_code = 401, detail="", 
                    headers={"WWW-Authenticate":"Bearer"})  
        
async def get_user_by_email(user_email):
    cursor = db.conn.cursor()
    email_query = f"SELECT * FROM app_user WHERE app_user_email = '{ user_email }';"
    cursor.execute(email_query)
    find_user = cursor.fetchone()
    if find_user:
        columns = [desc[0] for desc in cursor.description]
        user_info = dict(zip(columns, find_user))
        return user_info
    cursor.close()
    return find_user

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password.encode('utf-8'), hashed_password)

async def get_password_hash(password):
    return pwd_context.hash(password.encode('utf-8'))

async def create_access_token(user_id):
    payload = {
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_KEY, ALGORITHM)
    
async def get_user_current(user_token: str = Depends(oauth2_scheme_user)):
    try:
        token_decode = jwt.decode(user_token, SECRET_KEY, ALGORITHM)
        user_email = token_decode.get("sub")
        if user_email == None:
            raise HTTPException(status_code = 401, detail="User email not decoded", 
            headers={"WWW-Authenticate":"Bearer"})  
    except JWTError:
        raise HTTPException(status_code = 401, detail="User email not decoded", 
        headers={"WWW-Authenticate":"Bearer"})  
    
    user = await get_user_by_email(user_email)
    if not user:
        raise HTTPException(status_code = 401, detail="User not exists", 
        headers={"WWW-Authenticate":"Bearer"})  
    return user