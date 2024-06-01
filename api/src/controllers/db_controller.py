import os, psycopg2
from dotenv import load_dotenv

load_dotenv('.env.api')

conn = psycopg2.connect(  # Crea la conexión con la base de datos
                host = os.getenv("POSTGRES_HOST"),
                dbname = os.getenv("POSTGRES_DB"),
                user = os.getenv("POSTGRES_USER"),
                password = os.getenv("POSTGRES_PASSWORD"),
                port = os.getenv("POSTGRES_PORT")
            )


def query_database(query, parameters = None): #Función que ejecuta una consulta en la base de datos
    cursor = conn.cursor()
    if parameters != None:
        cursor.execute(query, parameters)
    else:
        cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows) == 0:
        return None
    return rows


