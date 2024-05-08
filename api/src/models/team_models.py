from pydantic import BaseModel

class TeamRegisterModel(BaseModel):
    project_auth_key: str
    team_description: str
    team_name: str
