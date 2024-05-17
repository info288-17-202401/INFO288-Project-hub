from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
import src.models.user_models as user_models
import src.services.auth_services as auth_services
from fastapi.security import OAuth2PasswordRequestForm

auth_router = APIRouter()

@auth_router.post("/register", tags=["auth"])
async def register_user(user_data: user_models.UserRegisterModel = Depends()):
    return await auth_services.register_user(user_data)

@auth_router.post("/login", tags=["auth"])
async def access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    await auth_services.login_user(form_data)
    token = await auth_services.create_access_token(form_data.username)
    return {
        "access_token": token,
        "token_type": "bearer"
    }
