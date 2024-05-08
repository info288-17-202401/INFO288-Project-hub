import os, db
from datetime import datetime, timedelta, timezone
import src.models.project_models as project_models
import src.services.auth_services as auth_services
import random
import string
from fastapi import HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, OAuth2PasswordBearer
from jose import jwt, JWTError

oauth2_scheme_project = OAuth2PasswordBearer(tokenUrl="/project/auth")
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = 'HS256'

async def create_project(project_data, user_data):
    cursor = db.conn.cursor()
    random_id = await random_key(10)
    project_add_query = f"""
        INSERT INTO project (project_id, project_creation_date, project_description, project_name, project_password, project_owner_id)
        VALUES (%s, %s, %s, %s, %s, %s);
    """
    project_add_query_parameters = (random_id, 
                             datetime.now(),
                             project_data.project_description,
                             project_data.project_name,
                             await auth_services.get_password_hash(project_data.project_password),
                             user_data['app_user_id'])
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
    return find_project

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
    teams_search_query = f"SELECT * FROM team WHERE project_id = '{ project_id }'"
    cursor.execute(teams_search_query)
    find_teams = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
   
    teams_as_dict = []
    for team in find_teams:
        team_dict = dict(zip(column_names, team))
        teams_as_dict.append(team_dict)
    
    return teams_as_dict

async def get_project_current(project_token: str):
    try:
        token_decode = jwt.decode(project_token, SECRET_KEY, ALGORITHM)
        team_id = token_decode.get("sub")
        if team_id == None:
            raise HTTPException(status_code = 401, detail="Project id not decoded", 
            headers={"WWW-Authenticate":"Bearer"})  
    except JWTError:
        raise HTTPException(status_code = 401, detail="Project id not decoded", 
        headers={"WWW-Authenticate":"Bearer"})  
    
    project = await get_project_by_id(team_id)
    if not project:
        raise HTTPException(status_code = 401, detail="Project not exists", 
        headers={"WWW-Authenticate":"Bearer"})  
    return project