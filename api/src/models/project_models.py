from pydantic import BaseModel

class ProjectRegisterModel(BaseModel):
    project_name: str
    project_password: str
    project_description: str

class ProjectSearchModel(BaseModel):
    project_id: str
    project_password: str
    
class ProjectTeamsModel(BaseModel):
    project_auth_key: str