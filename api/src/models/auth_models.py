from pydantic import BaseModel

class TokenModel(BaseModel): # Modelo para la obtención de un token
    access_token: str
    

    
class TokenData(BaseModel): # Modelo para la obtención de datos de un token
    user_email: str or None = None
