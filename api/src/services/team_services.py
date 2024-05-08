import  db
from datetime import datetime, timedelta, timezone
import src.models.project_models as project_models
import src.services.auth_services as auth_services

async def create_team(team_data, project_id):
    cursor = db.conn.cursor()
    team_add_query = f"""
        INSERT INTO team (team_creation_date, team_description, team_name, project_id)
        VALUES (%s, %s, %s, %s);
    """
    team_add_query_parameters = ( 
                             datetime.now(),
                             team_data.team_description,
                             team_data.team_name,
                             project_id)
    cursor.execute(team_add_query,team_add_query_parameters)
    db.conn.commit()