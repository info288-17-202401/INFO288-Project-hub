from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends
import src.models.team_models as team_models
import src.services.auth_services as auth_services
import src.services.team_services as team_services
import src.services.project_services as project_services
import src.services.tasks_services as tasks_services
import src.services.message_services as message_services




team_router = APIRouter()

@team_router.post("/join", tags =['team'])
async def join_to_team(  user = Depends(auth_services.get_user_current), 
                        team_data: team_models.TeamJoinModel = Depends()):
    project = await project_services.get_project_current(team_data.project_auth_key)
    await team_services.verify_team_in_project(team_data.team_id, project['project_id'])
    await team_services.join_team(user['app_user_id'], team_data.team_id)
    await team_services.send_user_status(user['app_user_id'], team_data.team_id, project['project_id'], "connected")
    
@team_router.post("/disconnect", tags =['team'])
async def disconnect_from_team(  user = Depends(auth_services.get_user_current), 
                        team_data: team_models.TeamJoinModel = Depends()):
    project = await project_services.get_project_current(team_data.project_auth_key)
    await team_services.disconnect_team(user['app_user_id'], team_data.team_id)
    await team_services.send_user_status(user['app_user_id'], team_data.team_id, project['project_id'], "disconnected")
    
@team_router.post("/create", tags =['team'])
async def create_team(  user = Depends(auth_services.get_user_current), 
                        team_data: team_models.TeamRegisterModel = Depends()):
    project = await project_services.get_project_current(team_data.project_auth_key)
    await team_services.create_team(team_data, project['project_id'])
    return {201, f"Team created in project {project['project_id']}"}

@team_router.get("/{team_id}/users", tags =['team'])
async def get_user_from_team(user = Depends(auth_services.get_user_current), 
                          team_data: team_models.TeamDataSearch = Depends()):
    
    await project_services.get_project_current(team_data.project_auth_key)
    users = await team_services.get_all_users_team(team_data.team_id)
    return users
    
@team_router.get("/{team_id}/messages", tags =['team'])
async def get_team_messages(user = Depends(auth_services.get_user_current), 
                          team_data: team_models.TeamDataSearch = Depends()):
    project = await project_services.get_project_current(team_data.project_auth_key)
    await team_services.verify_team_in_project(team_data.team_id, project['project_id'])
    messages = await message_services.get_team_messages(team_data.team_id)
    return messages

@team_router.get("/{team_id}/tasks", tags =['team'])
async def get_tasks_messages(user = Depends(auth_services.get_user_current), 
                          team_data: team_models.TeamDataSearch = Depends()):
    project = await project_services.get_project_current(team_data.project_auth_key)
    await team_services.verify_team_in_project(team_data.team_id, project['project_id'])
    tasks = await tasks_services.get_tasks_from_team(team_data.team_id)
    return tasks
