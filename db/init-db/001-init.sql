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

CREATE TABLE IF NOT EXISTS user_type(
    user_type_id SERIAL PRIMARY KEY,
    user_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS app_user_profile_project(
    app_user_profile_id SERIAL PRIMARY KEY,
    app_user_profile_type Int,
    app_user_id INT,
    project_id VARCHAR(20),

    FOREIGN KEY (app_user_profile_type) REFERENCES user_type(user_type_id),
    FOREIGN KEY (project_id) REFERENCES project(project_id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
);

CREATE TABLE IF NOT EXISTS team(
    team_id SERIAL PRIMARY KEY,
    team_creation_date DATE,
    team_description VARCHAR(255),
    team_name VARCHAR(255),
    team_private BOOLEAN,
    team_password VARCHAR(255),

    project_id VARCHAR(20),
    FOREIGN KEY (project_id) REFERENCES project(project_id)
);



INSERT INTO user_type(user_type)
VALUES
    ('Normal'),
    ('Owner'),
    ('Leader');

CREATE TABLE IF NOT EXISTS app_user_team(
    app_user_team_id SERIAL PRIMARY KEY,
    team_id INT,
    app_user_id INT,
    user_status VARCHAR(50) NOT NULL DEFAULT 'inactive',
    user_type INT,

    FOREIGN KEY (user_type) REFERENCES user_type(user_type_id),
    FOREIGN KEY (team_id) REFERENCES team(team_id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id)
);



CREATE TABLE IF NOT EXISTS message_state(
    message_state_id SERIAL PRIMARY KEY,
    message_state VARCHAR(255)
);

INSERT INTO message_state(message_state)
VALUES 
    ('Error'),
    ('Sent');
    

CREATE TABLE IF NOT EXISTS message_type(
    message_type_id SERIAL PRIMARY KEY,
    message_type VARCHAR(255)
);

INSERT INTO message_type(message_type)
VALUES 
    ('Project'),
    ('Private'),
    ('Team');

CREATE TABLE IF NOT EXISTS chat_message(
    message_id SERIAL PRIMARY KEY,
    message_date DATE,
    message_content VARCHAR(255),
    
    sent_by INT,
    message_state_id INT,
    message_type_id INT,
    app_user_team_id INT NULL,
    app_user_project_id VARCHAR(20) NULL,
    user_to_send INT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sent_by) REFERENCES app_user(app_user_id),
    FOREIGN KEY (message_state_id) REFERENCES message_state(message_state_id),
    FOREIGN KEY (message_type_id) REFERENCES message_type(message_type_id),
    FOREIGN KEY (app_user_team_id) REFERENCES app_user_team(app_user_team_id),
    FOREIGN KEY (app_user_project_id) REFERENCES project(project_id),
    FOREIGN KEY (user_to_send) REFERENCES app_user(app_user_id)
);

CREATE TABLE IF NOT EXISTS task(
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255),
    task_description VARCHAR(255),
    task_creation_date DATE,
    task_end_date DATE,
    task_deadline_date DATE,
    task_difficult INT,
    task_state VARCHAR(255),

    team_id INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id)
);


CREATE TABLE IF NOT EXISTS log_action(
    action_id INT PRIMARY KEY,
    action_description VARCHAR(255)
);

INSERT INTO log_action(action_id, action_description)
VALUES
    (1, 'Register User'),
    (2, 'Login User'),
    (3, 'Disconnect User'),
    (4, 'Create Project'),
    (5, 'Auth Project'),
    (6, 'Create Team'),
    (7, 'Add Owner'),
    (8, 'Add Leader'),
    (9, 'Auth Team'),
    (10,'General Message'),
    (11,'Team Message'),
    (12, 'Add Todo'),
    (13, 'Update Todo'),
    (14, 'Delete Todo');


CREATE TABLE IF NOT EXISTS log_state(
    state_id INT PRIMARY KEY,
    state_description VARCHAR(255)
);

INSERT INTO log_state(state_id, state_description)
VALUES
    (1, 'initialize'),
    (2, 'completed'),
    (3, 'error');



CREATE TABLE IF NOT EXISTS log(
    log_id SERIAL PRIMARY KEY,
    log_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_detail VARCHAR(255),
    log_state INT,
    app_user_id INT NULL,
    action_id INT,
    FOREIGN KEY (log_state) REFERENCES log_state(state_id),
    FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id),
    FOREIGN KEY (action_id) REFERENCES log_action(action_id)
);



