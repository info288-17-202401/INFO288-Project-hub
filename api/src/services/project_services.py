import os, db
from datetime import datetime, timedelta, timezone
import src.models.project_models as project_models
import src.services.auth_services as auth_services
import random
import string
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/project/auth")


async def create_project(project_data, user):
    cursor = db.conn.cursor()
    random_id = await random_key(10)
    cursor = db.conn.cursor()
    project_add_query = f"""
        INSERT INTO project (project_id, project_creation_date, project_description, project_name, project_password, project_owner_id)
        VALUES (%s, %s, %s, %s, %s, %s);
    """
    project_add_query_parameters = (random_id, 
                             datetime.now(),
                             project_data.project_description,
                             project_data.project_name,
                             await auth_services.get_password_hash(project_data.project_password),
                             user.get("app_user_id"))
    cursor.execute(project_add_query,project_add_query_parameters)
    db.conn.commit()
    
async def project_auth( project_data ):
    find_project = await get_project_by_id(project_data.project_id)
    if not find_project:
         raise HTTPException(status_code = 401, detail="Project not found", 
                    headers={"WWW-Authenticate":"Bearer"})  
    if not auth_services.verify_password(project_data.project_password, find_project['project_password']):
        raise HTTPException(status_code = 401, detail="Password error", 
                headers={"WWW-Authenticate":"Bearer"})  

async def random_key(tamaño):
    caracteres = string.ascii_letters + string.digits
    return ''.join(random.choice(caracteres) for _ in range(tamaño))

async def get_project_by_id(project_id):
    cursor = db.conn.cursor()
    project_search_query = f"SELECT * FROM project WHERE project_id = '{ project_id }';"
    cursor.execute(project_search_query)
    find_project = cursor.fetchone()
    if find_project:
        columns = [desc[0] for desc in cursor.description]
        user_info = dict(zip(columns, find_project))
        return user_info
    cursor.close()
    return find_project

async def get_teams_from_project(project_id):
    cursor = db.conn.cursor()
    teams_search_query = f"SELECT * FROM teams WHERE project_id = '{ project_id }'"


