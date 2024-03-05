import os
from loguru import logger

def set_up_logger() -> None:
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "token-validator.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)
