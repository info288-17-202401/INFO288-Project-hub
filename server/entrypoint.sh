#!/bin/bash
export $(cat ./.env | xargs)
IFS=',' read -ra ADDR <<< "$BACKEND_SERVERS"
BACKEND_SERVERS_CONFIG=""
for i in "${ADDR[@]}"; do
    BACKEND_SERVERS_CONFIG="${BACKEND_SERVERS_CONFIG}server $i;\n"
done
echo -e "Configured backend servers:\n$BACKEND_SERVERS_CONFIG"

IFS=',' read -ra ADDR <<< "$RABBIT_STOMP_SERVERS"
RABBIT_STOMP_SERVERS_CONFIG=""
for i in "${ADDR[@]}"; do
    RABBIT_STOMP_SERVERS_CONFIG="${RABBIT_STOMP_SERVERS_CONFIG}server $i;\n"
done

sed -i "s|# BACKEND_SERVERS_PLACEHOLDER|$BACKEND_SERVERS_CONFIG|g" /etc/nginx/nginx.conf
sed -i "s|# RABBIT_STOMP_SERVERS_PLACEHOLDER|$RABBIT_STOMP_SERVERS_CONFIG|g" /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

nginx -g 'daemon off;'