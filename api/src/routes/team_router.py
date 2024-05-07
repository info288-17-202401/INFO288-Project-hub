from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
import src.models.team_models as team_models
import src.services.auth_services as auth_services
import src.services.project_services as project_services

team_router = APIRouter()

@team_router.get("/create")
async def create_team(user = Depends(auth_services.get_user_current), 
                          team_data: team_models.TeamRegisterModel = Depends()):
    pass    

@team_router.get("/{team_id}/users")
async def get_user_from_team(user = Depends(auth_services.get_user_current), 
                          team_data: team_models.TeamRegisterModel = Depends()):
    pass    