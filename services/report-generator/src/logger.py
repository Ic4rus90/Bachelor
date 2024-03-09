import os
from loguru import logger

def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "workflow.log")
    logger.add(log_file_path, format="{time:YYYY-MM-DD HH:mm:ss.ms} {extra} {level} {message} ", rotation="50 MB", enqueue=True)