from pydantic import BaseModel

class UserRegisterModel(BaseModel): # Modelo para el registro de usuarios
    user_name: str
    user_email: str
    user_password: str

class UserLoginModel(BaseModel): # Modelo para el login de usuarios
    user_email: str
    user_password: str
    
    