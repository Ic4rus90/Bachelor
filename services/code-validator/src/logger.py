import os
from loguru import logger


# Sets up loguru to log to a file under code-validator/logs
def set_up_logger():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(cur_dir)
    logs_dir = os.path.join(parent_dir, "logs")
    os.makedirs(logs_dir, exist_ok=True)
    log_file_path = os.path.join(logs_dir, "syntax_checks.log")
    logger.add(log_file_path, rotation="50 MB", enqueue=True)
