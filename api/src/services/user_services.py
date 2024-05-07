from fastapi import FastAPI, status, HTTPException
import db
import src.services.auth_services as auth
import datetime



def register_user(user_data):
    cursor = db.conn.cursor()
    email_query = f"SELECT app_user_email FROM app_user WHERE app_user_email = '{ user_data.user_email}';"
    cursor.execute(email_query)
    find_user = cursor.fetchone()
    
    if find_user is None:
        user_query = f"""
            INSERT INTO app_user (app_user_name, app_user_email, app_user_password, app_user_create_date)
            VALUES (%s, %s, %s, %s);
        """
        user_query_parameters = (user_data.user_name,
                            user_data.user_email,
                            auth.get_password_hash(user_data.user_password),
                            datetime.datetime.now().date())
        cursor.execute(user_query,user_query_parameters)
        db.conn.commit()
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User email exists"
        )

def login_user():
    pass