import psycopg2, os, uvicorn
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.auth_router import auth_router
from src.routes.user_router import user_router
from src.routes.project_router import project_router
from src.routes.team_router import team_router
from src.routes.messages_router import messages_router
from src.routes.tasks_router import tasks_router

origins = ["*"] # Origenes permitidos

app = FastAPI() 
app.add_middleware( # Middleware para permitir CORS
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Rutas de los diferentes servicios
app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/user")
app.include_router(project_router, prefix="/project")
app.include_router(team_router, prefix="/team")
app.include_router(messages_router, prefix="/message")
app.include_router(tasks_router, prefix="/tasks")





@app.get("/", include_in_schema=False) # Ruta de prueba para verificar que el servidor esta funcionando
async def health() -> JSONResponse:
    return JSONResponse({"message": "It worked!!"})