from pydantic import BaseModel

class GenerateRequest(BaseModel):
    token: str

class GenerateResponse(BaseModel):
    message: str