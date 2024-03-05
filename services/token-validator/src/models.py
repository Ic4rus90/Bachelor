from pydantic import BaseModel

class GenerateRequest(BaseModel):
    token: str