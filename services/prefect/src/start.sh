#! /bin/bash
prefect cloud login -k $PREFECT_TK -w $PREFECT_WS
python3 main.py