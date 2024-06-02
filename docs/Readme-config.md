# Explicación de las Variables FRONTEND
**CHOKIDAR_USEPOLLING**: Establece el modo de polling para Chokidar, una librería de observación de archivos. Esto es útil en sistemas de archivos donde la detección de cambios es poco confiable.

**IP**: La dirección IP de la máquina local. Esto es crucial para la configuración de las URLs de la API y del broker.

**VITE_API_URL**: La URL de la API, utilizando la IP de la máquina local y el puerto 8010.

**VITE_BROKER_URL**: La URL del broker, utilizando la IP de la máquina local y el puerto 8020.

**VITE_DEVELOPMENT**: Indica si la aplicación está en modo de desarrollo (true/false).

**VITE_RABBITMQ_LOGIN**: El nombre de usuario para RabbitMQ.

**VITE_RABBITMQ_PASSCODE**: La contraseña para RabbitMQ.

## Obtener la IP de la Máquina Local

Para obtener la IP de tu máquina local, sigue estos pasos:

- Abre una terminal.

- Ejecuta el siguiente comando:

En distribuciones Unix

```bash
ifconfig
```

En windows

```bash
ipconfig
```

Busca la interfaz en0 y encuentra la línea que comienza con inet. La dirección IP que aparece en esta línea es la IP de tu máquina local. Por ejemplo, en la salida siguiente:

```bash
en0: flags=8863<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
inet 172.20.10.14 netmask 0xffffff00 broadcast 172.20.10.255
inet6 fe80::aede:48ff:fe00:1122%en0 prefixlen 64 secured scopeid 0x4
```
La IP es 172.20.10.14.
Sustituye la dirección IP de la variable IP con la obtenida en el archivo .env.

# Explicación de las Variables BACKEND

**POSTGRES_DB**: Nombre de la base de datos que se esta utilizando

**POSTGRES_HOST**: Dirección del servidor donde se encuentra la base de datos

**POSTGRES_USER**: Nombre de usuario para conectarse a la base de datos

**POSTGRES_PASSWORD**: Contraseña para el usuario de la base de datos

**POSTGRES_PORT**: Puerto a traves del cual se conecta la base de datos

**RABBIT_USER**: Nombre de usuario para conectarse al servidor RabbitMQ

**RABBIT_PASSWORD**: Contraseña de usuario de RabbitMQ

**RABBIT_HOST**: Dirección del servidor RabbitMQ

**RABBIT_PORT**: Puerto a traves del cual se accede al servidor RabbitMQ (habitualmente 5672)

**SECRET_KEY**: Clave utilizada para asegurar la aplicación mediante la generación de tokens

**OVERLAY_HOST**: Dirección IP donde la aplicacion se ejecutará y aceptará conexiones

# Explicación de las Variables BROKER

**RABBITMQ_USER**: Nombre de usuario para conectarse al servidor RabbitMQ

**RABBITMQ_PASSWORD**: Contraseña para el usuario de RabbitMQ

**RABBITMQ_STOMP_PORT**: Pureto utilizado para conexiones STOMP

**RABBITMQ_STOMP_WEBSOCKET_PORT**: Puerto utilizado para conexiones STOMP sobre websocket

**FIRST_NODE_HOST**: Nodo inicial en un cluster de RabbitMQ

**ERLANG_COOKIE**: Cookie utilizada para la autenticación entre nodos en un cluster RabbitMQ, necesario para la comunicación entre nodos

Si se desea añadir mas de un servidor de rabbitmq se deben añadir los servidores posteriores al cluster inicial de rabbitmq

```sh
docker build -t project_hub_broker . -f ./Dockerfile.rabbitmq
docker run --name project_hub_broker_1 --hostname project_hub_broker_1 --env-file ./.env.rabbitmq --network project_hub_overlay -p 2552:5672 -p 2562:15672 -p 61615:61613 -p "15676:15674" -d project_hub_broker

docker exec -it project_hub_broker_1 rabbitmqctl stop_app
docker exec -it project_hub_broker_1 rabbitmqctl reset
docker exec -it project_hub_broker_1 rabbitmqctl join_cluster rabbit@project_hub_broker
docker exec -it project_hub_broker_1 rabbitmqctl start_app
```

# Explicación de las Variables NGINX

**BACKEND_SERVER**: Direcciones del servidor backend de la aplicación. Si existe más de una, estan deben estar separadas con ","

**RABBIT_STOMP_SERVERS**: Direccion del servidor RabbitMQ que usa el protocolo STOMP sobre Websocket. Si existe más de una, estas deben estar separadas por ",".


# Explicación de las Variables DATABASE

**POSTGRES_USER**: Nombre de usuario para conectarse a la base de datos PostgreSQL

**POSTGRES_PASSWORD**: Contraseña para el usuario de la base de datos 

**POSTGRES_DB**: Nombre de la base de datos que se esta utilizando
