import json
from datetime import datetime
import src.controllers.db_controller as db
import src.controllers.rabbit_controller as rabbit_controller

async def send_message_to_queue(message, user, project):
    content_message_broker = {
        "message_text": message.message_content,
        "user_name": user['app_user_name'],
        "user_email": user['app_user_email'],
    }
    body = json.dumps(content_message_broker)
    rabbit_controller.channel.basic_publish(exchange='',
                        routing_key=f"messages/{project['project_id']}/{message.team_id}",
                        body=body.encode())
    return content_message_broker

async def save_in_db_team_message(message, user):
    cursor = db.conn.cursor()
    check_user_query = f"""
        SELECT * FROM app_user_team WHERE app_user_id = %s AND team_id = %s;
    """
    check_user_query_parameters = ( 
                        user['app_user_id'],
                        message.team_id
    )       
    cursor.execute(check_user_query,check_user_query_parameters)
    user_team_id = cursor.fetchone()[0]
    if user_team_id is not None:    
        message_in_db = f"""
            INSERT INTO chat_message (message_date, message_content, message_state_id, message_type_id, app_user_team_id)
            VALUES (%s, %s, %s, %s, %s);
        """
    
        message_in_db_query_parameters = ( 
                                datetime.now(),
                                message.message_content,
                                2,
                                3,
                                user_team_id
                                )

        cursor.execute(message_in_db,message_in_db_query_parameters)
        db.conn.commit()
        
    
async def get_team_messages(team_id):
    cursor = db.conn.cursor()
    get_team_messages_query = f"""
        SELECT aut.app_user_team_id, cm.message_id, cm.message_date, message_content
        FROM chat_message cm
        JOIN app_user_team aut ON cm.app_user_team_id = aut.app_user_team_id
		WHERE aut.team_id = %s
    """
    
    cursor.execute(get_team_messages_query, (team_id, ))
    team_messages = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
   
    team_messages_dict = []
    for messages in team_messages:
        message_dict = dict(zip(column_names, messages))
        team_messages_dict.append(message_dict)
    
    return team_messages_dict
