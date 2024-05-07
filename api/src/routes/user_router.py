from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
import src.models.user_models as user_models
import src.services.auth_services as auth_services
from fastapi.security import OAuth2PasswordRequestForm
user_router = APIRouter()

@user_router.post("/register")
async def register_user(user_data: user_models.UserRegisterModel):
    return await auth_services.register_user(user_data)


@user_router.post("/login")
async def access_token(form_data: user_models.UserLoginModel = Depends()):
    await auth_services.login_user(form_data)
    token = await auth_services.create_access_token(form_data.user_email)
    expires = datetime.now(timezone.utc) + timedelta(hours=1)

    #Queda la access_token como cookie
    response = Response()
    response.set_cookie(key="access_token", value=token, httponly=True, expires=expires)
    
    return response
    
@user_router.get("/protected")
async def protected_route(user = Depends(auth_services.get_user_current)):
    return user

