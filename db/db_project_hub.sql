CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS app_user(
    app_user_id SERIAL PRIMARY KEY,
    app_user_name VARCHAR(255),
    app_user_email VARCHAR(255),
    app_user_password VARCHAR(255),
    app_user_last_session DATE,
    app_user_create_date DATE
);

CREATE TABLE IF NOT EXISTS project(
    project_id VARCHAR(20) PRIMARY KEY,
    project_creation_date DATE,
    project_description VARCHAR(255),
    project_name VARCHAR(255),
    project_password VARCHAR(255),

    project_owner_id INT,
    FOREIGN KEY (project_owner_id) REFERENCES app_user(app_user_id)
);

CREATE TABLE IF NOT EXISTS app_user_profile_project(
    app_user_profile_id SERIAL PRIMARY KEY,
    app_user_profile_type VARCHAR(255),
    app_user_id INT,
    project_id VARCHAR(20),

    FOREIGN KEY (project_id) REFERENCES project(project_id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
);

CREATE TABLE IF NOT EXISTS team(
    team_id SERIAL PRIMARY KEY,
    team_creation_date DATE,
    team_description VARCHAR(255),
    team_name VARCHAR(255),

    project_id VARCHAR(20),
    FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE IF NOT EXISTS app_user_team(
    app_user_team_id SERIAL PRIMARY KEY,
    team_id INT,
    app_user_id INT,

    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
);

CREATE TABLE IF NOT EXISTS team_chat(
    team_chat_id SERIAL PRIMARY KEY,
    team_id INT,
    
    FOREIGN KEY (team_id) REFERENCES team(team_id)
);


CREATE TABLE IF NOT EXISTS message_state(
    message_state_id SERIAL PRIMARY KEY,
    message_state VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS message_type(
    message_type_id SERIAL PRIMARY KEY,
    message_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS chat_message(
    message_id SERIAL PRIMARY KEY,
    message_date DATE,
    message_content VARCHAR(255),
    
    message_state_id INT,
    message_type_id INT,
    team_chat_id INT,
    app_user_team_id INT,

    FOREIGN KEY (message_state_id) REFERENCES message_state(message_state_id),
    FOREIGN KEY (message_type_id) REFERENCES message_type(message_type_id),
    FOREIGN KEY (team_chat_id) REFERENCES team_chat(team_chat_id),
    FOREIGN KEY (app_user_team_id) REFERENCES app_user_team(app_user_team_id)
);

CREATE TABLE IF NOT EXISTS task_state(
    state_id SERIAL PRIMARY KEY,
    state_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS task(
    task_id SERIAL PRIMARY KEY,
    task_description VARCHAR(255),
    task_creation_date DATE,
    task_end_date DATE,
    task_deadline_date DATE,
    task_difficult INT,

    team_id INT,
    state_id INT,

    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (state_id) REFERENCES task_state(state_id)
);


CREATE TABLE IF NOT EXISTS log_action(
    action_id SERIAL PRIMARY KEY,
    action_description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS log(
    log_id SERIAL PRIMARY KEY,
    log_creation_date DATE,
    log_detail VARCHAR(255),

    app_user_id INT,
    action_id INT,

    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id),
    FOREIGN KEY (action_id) REFERENCES log_action(action_id)
);