import pika


credentials = pika.PlainCredentials('admin','admin123')
parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()  

queue_name = 'messages/5QdEPG2uyV'
channel.queue_declare(queue=queue_name)

def callback(ch, method, properties, body):
    print("Mensaje recibido:", body)
    
channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
print('Esperando mensajes. Presiona CTRL+C para salir.')
channel.start_consuming()
