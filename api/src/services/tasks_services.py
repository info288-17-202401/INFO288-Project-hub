import json
from datetime import datetime
import src.controllers.db_controller as db
import src.controllers.rabbit_controller as rabbit_controller

async def get_tasks_from_team(team_id): # Obtiene las tareas de un equipo segundo su id
    cursor = db.conn.cursor()
    get_tasks_messages_query = f"""
        SELECT *
        FROM task
		WHERE team_id = %s
    """
    
    cursor.execute(get_tasks_messages_query, (team_id, ))
    team_tasks = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
   
    team_messages_dict = []
    for tasks in team_tasks:
        tasks_dict = dict(zip(column_names, tasks))
        team_messages_dict.append(tasks_dict)
    
    return team_messages_dict

async def add_task(task_data): # Añade una tarea a la base de datos segun los datos recibidos
    cursor = db.conn.cursor()
    add_task_query = f"""
            INSERT INTO task (task_description, task_creation_date, task_end_date, task_deadline_date, task_difficult, task_state, team_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
    add_task_query_parameters = ( 
                            task_data.task_description,
                            datetime.now(),
                            task_data.task_end_date,
                            task_data.task_deadline_date,
                            task_data.task_difficult,
                            task_data.task_state,
                            task_data.team_id
                            )
    cursor.execute(add_task_query,add_task_query_parameters)
    db.conn.commit()
    
async def update_task(task_data): # Actualiza una tarea en la base de datos segun los datos recibidos
    cursor = db.conn.cursor()
    update_task_query = f"""
        UPDATE task
        SET task_description = %s,
            task_end_date = %s,
            task_deadline_date = %s,
            task_difficult = %s,
            task_state = %s
        WHERE task_id = %s;
        """
    update_task_query_parameters = ( 
                            task_data.task_description,
                            task_data.task_end_date,
                            task_data.task_deadline_date,
                            task_data.task_difficult,
                            task_data.task_state,
                            task_data.task_id
                            )
    cursor.execute(update_task_query, update_task_query_parameters)
    db.conn.commit()

    
async def destroy_task(task_id): # Elimina una tarea de la base de datos segun su id
    cursor = db.conn.cursor()
    task_destroy_query = f"""
        DELETE FROM task WHERE task_id = %s
        """
    cursor.execute(task_destroy_query,(task_id,))
    db.conn.commit()

    
async def send_task_to_queue(task_data, project_id, tag): # Añade una tarea a la cola, usando rabbitmq
    content_message_broker = {
                              "task_description":task_data.task_description,
                                "task_end_date":task_data.task_end_date.isoformat(),
                                "task_deadline_date":task_data.task_deadline_date.isoformat(),
                                "task_difficult":task_data.task_difficult,
                                "task_state":task_data.task_state,
                                "team_id":task_data.team_id,
                                "task_data": tag
                              }
    
    body = json.dumps(content_message_broker)
    rabbit_controller.channel.basic_publish(exchange='',
                        routing_key=f"task/{project_id}/{task_data.team_id}",
                        body=body.encode())
    return content_message_broker