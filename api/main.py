import psycopg2, os, uvicorn
from fastapi import FastAPI
import src.routes.user_router as user_router
import src.database.db as db

app = FastAPI()

# routes
app.include_router(user_router.user_router, prefix="/user")

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
    db.database_connection()
