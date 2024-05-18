from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
import src.models.project_models as project_models
import src.models.auth_models as auth_models
import src.services.auth_services as auth_services
import src.services.project_services as project_services

user_router = APIRouter()

@user_router.get("/projects", tags=["user"])
async def get_projects_from_user(user_data=Depends(auth_services.get_user_current)):
    return await project_services.get_all_projects_from_user(user_data["app_user_id"])
