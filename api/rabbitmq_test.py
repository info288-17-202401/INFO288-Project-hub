import stomp

class MyListener(stomp.ConnectionListener):
    def on_error(self, frame):
        print(f'Error: {frame.body}')
    
    def on_message(self, frame):
        print(f'Mensaje recibido: {frame.body}')
conn = stomp.Connection([('localhost', 61613)])
conn.set_listener('', MyListener())
conn.connect('admin', 'admin123', wait=True)

queue_name = '/queue/messages'
conn.subscribe(destination=queue_name, id=1, ack='auto')

print('Esperando mensajes. Presiona CTRL+C para salir.')
try:
    while True:
        pass
except KeyboardInterrupt:
    conn.disconnect()