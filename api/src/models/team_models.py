from pydantic import BaseModel
from typing import Optional

class TeamRegisterModel(BaseModel):
    project_auth_key: str
    team_description: str
    team_name: str
    team_password: Optional[str] = None

class TeamJoinModel(BaseModel):
    project_auth_key: str
    team_id: int
    team_password: Optional[str] = None
    
class TeamDataSearch(BaseModel):
    project_auth_key: str
    team_id: int