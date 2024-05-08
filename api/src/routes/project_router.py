from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
import src.models.project_models as project_models
import src.services.auth_services as auth_services
import src.services.project_services as project_services

project_router = APIRouter()

@project_router.post("/create")
async def create_project(user = Depends(auth_services.get_user_current), 
                          project_data: project_models.ProjectRegisterModel = Depends()):
    await project_services.create_project(project_data, user)
    
@project_router.get("/auth")
async def auth_project(user = Depends(auth_services.get_user_current), 
                        project_data: project_models.ProjectSearchModel = Depends()):
    token = await auth_services.create_access_token(project_data.project_id)
    return {
        "access_token": token,
        "token_type": "bearer"
    }
    

@project_router.get("/search")
async def search_project(user = Depends(auth_services.get_user_current), 
                          project_data: project_models.ProjectSearchModel = Depends()):
    return await project_services.get_project_by_id(project_data.project_id)


@project_router.get("/{project_id}/teams")
async def get_teams_from_project(user = Depends(auth_services.get_user_current), 
                          project_data: project_models.ProjectSearchModel = Depends()):
    return await project_services.get_teams_from_project(project_data)