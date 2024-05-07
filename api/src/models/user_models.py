from pydantic import BaseModel

class UserRegisterModel(BaseModel):
    user_name: str
    user_email: str
    user_password: str

class UserLoginModel(BaseModel):
    user_email: str
    user_password: str