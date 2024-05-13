from pydantic import BaseModel

# Model for requests to this service
class GenerateRequest(BaseModel):
    token: str

# Model for responses from this service
class GenerateResponse(BaseModel):
    message: str