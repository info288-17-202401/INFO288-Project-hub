from fastapi import FastAPI, status, HTTPException
import db
import src.services.auth_services as auth
import datetime

async def register_user(user_data):
    find_user = await get_user_by_email(user_data.user_email)
    cursor = db.conn.cursor()
    if not find_user:
        user_query = f"""
            INSERT INTO app_user (app_user_name, app_user_email, app_user_password, app_user_create_date)
            VALUES (%s, %s, %s, %s);
        """
        user_query_parameters = (user_data.user_name,
                            user_data.user_email,
                            await auth.get_password_hash(user_data.user_password),
                            datetime.datetime.now().date())
        cursor.execute(user_query,user_query_parameters)
        db.conn.commit()
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User email exists"
        )

async def login_user(user_data):
    find_user = await get_user_by_email(user_data.user_email)
    if find_user:    
        password_verify = await auth.verify_password(user_data.user_password, find_user['app_user_password'])
        print(password_verify)
    else:
        print("not found")
        
async def get_user_by_email(user_email):
    cursor = db.conn.cursor()
    email_query = f"SELECT * FROM app_user WHERE app_user_email = '{ user_email }';"
    cursor.execute(email_query)
    find_user = cursor.fetchone()
    if find_user:
        columns = [desc[0] for desc in cursor.description]
        user_info = dict(zip(columns, find_user))
        return user_info
    cursor.close()
    return find_user
        