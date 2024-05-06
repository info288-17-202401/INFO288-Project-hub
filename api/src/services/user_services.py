from fastapi import HTTPException
import src.database.db as db

def register_user(user_data, ):
    db.cursor.execute(f"SELECT app_user_email FROM app_user WHERE app_user_email = {user_data.user_email} ")
    exists_user = db.cursor.fetchone()
    if exists_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    else:
        db.cursor.execute(f" INSERT INTO app_user (app_user_name, app_user_email, app_user)
                            ")
        

def get_hashed_password(password):

    pass