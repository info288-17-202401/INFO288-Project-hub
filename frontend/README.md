# Explicación de las Variables

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
