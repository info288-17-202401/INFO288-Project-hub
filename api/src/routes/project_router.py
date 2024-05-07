from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
import src.models.project_models as project_models
import src.services.auth_services as auth_services
import src.services.project_services as project_services

project_router = APIRouter()

@project_router.get("/create")
async def protected_route(user = Depends(auth_services.get_user_current), 
                          project_data: project_models.ProjectRegisterModel = Depends()):
    await project_services.create_project(project_data, user)
    
    
@project_router.get("/search")
async def protected_route(user = Depends(auth_services.get_user_current), 
                          project_data: project_models.ProjectSearchModel = Depends()):
    return await project_services.search_project(project_data)
