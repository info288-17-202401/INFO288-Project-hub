#!/bin/bash

RABBITMQ_USER=$RABBITMQ_USER
RABBITMQ_PASSWORD=$RABBITMQ_PASSWORD
RABBITMQ_STOMP_PORT=$RABBITMQ_STOMP_PORT
RABBITMQ_STOMP_WEBSOCKET_PORT=$RABBITMQ_STOMP_WEBSOCKET_PORT

rabbitmq-server -detached
# Espera a que RabbitMQ se inicie
sleep 10
rabbitmqctl start_app
# Crea un usuario y una contraseña
rabbitmqctl add_user $RABBITMQ_USER $RABBITMQ_PASSWORD
rabbitmqctl set_user_tags $RABBITMQ_USER administrator
rabbitmqctl set_permissions -p / $RABBITMQ_USER ".*" ".*" ".*"
rabbitmqctl set_policy my_policy "^queue\." '{"max-length":1000}' --apply-to queues

# Enable the STOMP plugin
rabbitmq-plugins enable rabbitmq_stomp
rabbitmq-plugins enable rabbitmq_web_stomp

# Configure RabbitMQ for STOMP and WebSocket
cat <<EOF > /etc/rabbitmq/rabbitmq.config
[
  {rabbit, [
    {loopback_users, []}
  ]},
  {rabbitmq_stomp, [
    {tcp_listeners, [{"0.0.0.0", $RABBITMQ_STOMP_PORT}]},
    {ssl_listeners, []},
    {default_user, [{$RABBITMQ_USER, $RABBITMQ_PASSWORD}]},
    {default_vhost, "/"}
  ]},
  {rabbitmq_web_stomp, [
    {tcp_listeners, [{"0.0.0.0", $RABBITMQ_STOMP_WEBSOCKET_PORT}]},
    {ssl_listeners, []},
    {default_user, [{$RABBITMQ_USER, $RABBITMQ_PASSWORD}]},
    {default_vhost, "/"}
  ]}
].
EOF

if ping -c 1 $FIRST_NODE_HOST &> /dev/null
then
    echo "El host $FIRST_NODE_HOST está accesible. Intentando unirse al clúster..."
    rabbitmqctl stop_app
    echo $ERLANG_COOKIE > /var/lib/rabbitmq/.erlang.cookie
    chown rabbitmq:rabbitmq /var/lib/rabbitmq/.erlang.cookie
    chmod 400 /var/lib/rabbitmq/.erlang.cookie

    rabbitmqctl join_cluster rabbit@$FIRST_NODE_HOST
    rabbitmqctl start_app
else
    echo "El host $FIRST_NODE_HOST no está accesible. Iniciando RabbitMQ sin unirse al clúster."
fi

# Detiene el servidor RabbitMQ
rabbitmqctl stop

# Ejecuta RabbitMQ en primer plano
rabbitmq-server