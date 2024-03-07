from pydantic import BaseModel

class TransformRequest(BaseModel):
    encoded_json: str
    user_id: str
    file_extension: str
    analyzed_code: str
    starting_line_number: int

class TransformResponse(BaseModel):
    encoded_summary: str
    encoded_full: str