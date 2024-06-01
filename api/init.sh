#!/bin/bash
uvicorn main:app --host=$OVERLAY_HOST --port=8000 --reload
