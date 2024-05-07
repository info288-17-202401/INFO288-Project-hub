from pydantic import BaseModel

class TokenModel(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    user_email: str or None = None
