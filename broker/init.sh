#!/bin/bash

rabbitmq-server -detached
# Espera a que RabbitMQ se inicie
sleep 10

# Crea un usuario y una contraseña
rabbitmqctl add_user $RABBITMQ_USER $RABBITMQ_PASSWORD
rabbitmqctl set_user_tags $RABBITMQ_USER administrator
rabbitmqctl set_permissions -p / $RABBITMQ_USER ".*" ".*" ".*"

# Detiene el servidor RabbitMQ
rabbitmqctl stop

# Ejecuta RabbitMQ en primer plano
rabbitmq-server