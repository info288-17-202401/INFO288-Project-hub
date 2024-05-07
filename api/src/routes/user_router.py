from fastapi import APIRouter
import src.models.user_models as user_models
import src.services.user_services as user_services

user_router = APIRouter()

@user_router.post("/register")
async def register_user(user_data: user_models.UserRegisterModel):
    return await user_services.register_user(user_data)

@user_router.post("/login")
async def login_user(user_data: user_models.UserLoginModel):
    return await user_services.login_user(user_data)

