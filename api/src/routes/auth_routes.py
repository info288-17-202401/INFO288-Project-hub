import os
from dotenv import load_dotenv


auth_router = APIRouter(
    prefix='/auth',
    tags=["auth"]
)

load_dotenv()
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')



def create_access_token(username:str):
    encode = {'sub': username}
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)