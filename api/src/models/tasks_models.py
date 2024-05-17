from pydantic import BaseModel
from datetime import date

class TasksModel(BaseModel):
    project_auth_key: str
    team_id: int
    task_description: str
    task_end_date: date
    task_deadline_date: date
    task_difficult: int
    task_state: str
    
class TaskUpdateModel(BaseModel):
    project_auth_key: str
    team_id: int
    task_id: int
    task_description: str
    task_end_date: date
    task_deadline_date: date
    task_difficult: int
    task_state: str
    
class TaskDestroyModel(BaseModel):
    project_auth_key: str
    task_id: int