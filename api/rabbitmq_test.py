import stomp, pika, time

class MyListener(stomp.ConnectionListener): 
    def on_error(self, message):
        print(f'Error: {message}')
    
    def on_message(self, message):
        print(f'Mensaje recibido: {message}')

conn = stomp.Connection([('localhost', 61613)])
conn.set_listener('', MyListener())
conn.connect('admin', 'admin123', wait=True) 

queue_name = '/queue/messages_team_1'
conn.subscribe(destination=queue_name, id=1, ack='auto')

print('Esperando mensajes. Presiona CTRL+C para salir.')
try:
    while True:
        pass
except KeyboardInterrupt:
    conn.disconnect()