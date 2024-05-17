from pydantic import BaseModel

class MessageContent(BaseModel):
    project_auth_key: str
    team_id: int
    message_content: str
    