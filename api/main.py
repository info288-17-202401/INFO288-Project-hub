import psycopg2, os, uvicorn
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.auth_router import auth_router
from src.routes.project_router import project_router


origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# routes
app.include_router(auth_router, prefix="/user")
app.include_router(project_router, prefix="/project")


@app.get("/", include_in_schema=False)
async def health() -> JSONResponse:
    return JSONResponse({"message": "It worked!!"})