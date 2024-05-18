import json
from datetime import datetime
import src.services.auth_services as auth_services
import src.controllers.rabbit_controller as rabbit_controller
import src.controllers.db_controller as db
from fastapi import HTTPException

async def create_team(team_data, project_id):
    cursor = db.conn.cursor()
    team_add_query = None
    team_add_query_parameters = None
    if team_data.team_password == "" or team_data.team_password == None:
        team_add_query = f"""
            INSERT INTO team (team_creation_date, team_description, team_name, project_id, team_private)
            VALUES (%s, %s, %s, %s, %s);
        """
        team_add_query_parameters = ( 
                                datetime.now(),
                                team_data.team_description,
                                team_data.team_name,
                                project_id,
                                False)
    else:
        team_add_query = f"""
            INSERT INTO team (team_creation_date, team_description, team_name, project_id, team_password, team_private)
            VALUES (%s, %s, %s, %s, %s, %s);
        """
        team_add_query_parameters = ( 
                                datetime.now(),
                                team_data.team_description,
                                team_data.team_name,
                                project_id,
                                await auth_services.get_password_hash(team_data.team_password),
                                True)
    cursor.execute(team_add_query,team_add_query_parameters)
    db.conn.commit()
    
async def get_all_users_team(team_id):
    cursor = db.conn.cursor()
    get_user_query = f"""
        SELECT au.app_user_id, au.app_user_name, au.app_user_email, au.app_user_last_session
        FROM app_user_team aut
        JOIN app_user au ON aut.app_user_id = au.app_user_id
        WHERE aut.team_id = %s AND aut.user_status = %s;
    """
    get_user_query_parameters = (
        team_id,
        "active"
    )
    
    cursor.execute(get_user_query, get_user_query_parameters)
    find_users = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
   
    users_as_dict = []
    for users in find_users:
        user_dict = dict(zip(column_names, users))
        users_as_dict.append(user_dict)
    
    return users_as_dict

async def verify_team_in_project(team_id, project_id):
    cursor = db.conn.cursor()
    check_user_query = f"""
        SELECT COUNT(*) FROM team WHERE team_id = %s AND project_id = %s;
    """
    cursor.execute(check_user_query, (team_id, project_id))
    team = cursor.fetchone()
    team_in_project = team[0] > 0
    if not team_in_project:
        raise HTTPException(status_code = 401, detail="Team not in project", 
                headers={"WWW-Authenticate":"Bearer"})  
    return team
        
async def join_team(user_id, team_id):
    
    
    cursor = db.conn.cursor()
    check_user_query = """
        SELECT COUNT(*) FROM app_user_team WHERE app_user_id = %s;
    """
    cursor.execute(check_user_query, (user_id,))
    user_exists = cursor.fetchone()[0] > 0

    if user_exists:
        update_user_query = """
            UPDATE app_user_team
            SET user_status = %s
            WHERE app_user_id = %s AND team_id = %s;
        """
        update_user_query_parameters = ("active", user_id, team_id)
        cursor.execute(update_user_query, update_user_query_parameters)
    else:
        insert_user_query = """
            INSERT INTO app_user_team (team_id, app_user_id, user_status)
            VALUES (%s, %s, %s);
        """
        insert_user_query_parameters = (team_id, user_id, "active")
        cursor.execute(insert_user_query, insert_user_query_parameters)
    
    
    db.conn.commit()

async def disconnect_team(user_id, team_id):
    cursor = db.conn.cursor()
    check_user_query = """
        SELECT COUNT(*) FROM app_user_team WHERE app_user_id = %s;
    """
    cursor.execute(check_user_query, (user_id,))
    user_exists = cursor.fetchone()[0] > 0
    
    if user_exists:
        update_user_query = """
            UPDATE app_user_team
            SET user_status = %s
            WHERE app_user_id = %s AND team_id = %s;
        """
        update_user_query_parameters = ("inactive", user_id, team_id)
        cursor.execute(update_user_query, update_user_query_parameters)
    
    db.conn.commit()
    
async def send_user_status(user_id, team_id, project_id, status):
    content_message_broker = {
        "user_id": user_id,
        "status": status
    }
    body = json.dumps(content_message_broker)
    rabbit_controller.channel.basic_publish(exchange='',
                        routing_key=f"messages/{project_id}/{team_id}",
                        body=body.encode())
    return content_message_broker

    