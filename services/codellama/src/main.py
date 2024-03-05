from fastapi import FastAPI, HTTPException, Request
from models import GenerateRequest
from generator import generate_text
from logger import logger, set_up_logger

app = FastAPI()

set_up_logger()

@app.post("/generate/")
async def generate(request: Request, generate_request: GenerateRequest):
    return await generate_text(request, generate_request)
