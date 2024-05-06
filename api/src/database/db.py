import os, psycopg2
from dotenv import load_dotenv

load_dotenv()
connection = cursor = None

parameters = {
    "host": os.environ.get("DB_HOST"),
    "port": os.environ.get("DB_PORT"),
    "user": os.environ.get("DB_USER"),
    "password": os.environ.get("DB_PASSWORD"),
    "database": os.environ.get("DB_NAME")
}

def database_connection():
    try:
        connection = psycopg2.connect(**parameters)
        cursor = connection.cursor()
    except (Exception, psycopg2.Error) as error:
            print("Cant connect to PostgreSQL:", error)       

def get_db_connection():
    return connection

def get_db_cursor():
    return cursor