from fastapi import FastAPI, HTTPException, Request
from models import GenerateRequest
from generator import generate_text
from logger import set_up_logger, logger
from datetime import datetime

import asyncio

app = FastAPI()

set_up_logger()

request_queue = asyncio.Queue()

async def worker():
    while True:
        generate_request, result_future, client_request = await request_queue.get()

        processing_start = datetime.now()
        logger.info(f"Starting processing request from {client_request.client.host}. Queue size: {request_queue.qsize()}")

        try:
            # Process the request
            result = await generate_text(client_request, generate_request)
            
            # Set the result in the future
            result_future.set_result(result)

            processing_end = datetime.now()
            processing_time = (processing_end - processing_start).total_seconds()
            logger.info(f"Successfully processed request from {client_request.client.host} in {processing_time} seconds.")
        except Exception as e:
            logger.exception("An error occured during text generation.")
            result_future.set_exception(e)
        finally:
            # Mark queue task as done
            request_queue.task_done()
        

@app.on_event("startup")
async def startup_event():
    task = asyncio.create_task(worker())


@app.post("/generate/")
async def generate(request: Request, generate_request: GenerateRequest):
    # Create a future that the worker will use to send back the result
    result_future = asyncio.Future()

    # Add request, future, and Request object to queue
    await request_queue.put((generate_request, result_future, request))

    # Wait for result
    result = await result_future
    return result
