import pika, os, time
from dotenv import load_dotenv
import stomp
import logging


logging.basicConfig(level=logging.INFO)

# Carga las variables de entorno y setea los parametros de conexión y credenciales
load_dotenv('.env.api') 
credentials = pika.PlainCredentials(os.getenv("RABBIT_USER"),os.getenv("RABBIT_PASSWORD"))
parameters = pika.ConnectionParameters(os.getenv("RABBIT_HOST"), os.getenv("RABBIT_PORT"), '/', credentials, heartbeat=120) 

class MyListener(stomp.ConnectionListener): #Clase que escucha y controla los eventos de conexión
    def __init__(self, controller):
        self.controller = controller

    def on_error(self, frame):
        print(f'received an error: {frame.body}')

    def on_message(self, frame):
        print(f'received a message: {frame.body}')

    def on_disconnected(self):
        print('Connection lost. Reconnecting...')
        # Attempt to reconnect
        time.sleep(5)
        self.controller.connect()

    def on_heartbeat_timeout(self):
        print('Heartbeat timeout. Reconnecting...')
        # Attempt to reconnect
        time.sleep(5)
        self.controller.connect()

    def on_receipt(self, frame):
        print(f'Receipt received: {frame}')

    def on_connected(self, frame):
        print(f'Connected: {frame}')
        

class RabbitController: #Clase que controla la conexión con RabbitMQ
    def __init__(self): 
        self.connection = None
        self.connect()
        self.subscription_counter = 0
        
    def connect(self, retries=10, delay=10): #Método que se encarga de la conexión con RabbitMQ
        attempt = 0
        while attempt < retries: #Intenta conectarse varias veces antes de lanzar una excepción
            try:
                self.connection = stomp.Connection([('project_hub_broker', 61613)])
                self.connection.set_listener('', MyListener(self))
                self.connection.connect('admin', 'admin123', wait=True)
                logging.info(f'Connected on attempt {attempt + 1}') 
                return
            except Exception as e: 
                logging.error(f'Connection attempt {attempt + 1} failed: {e}')
                attempt += 1
                time.sleep(delay)
        raise Exception('Failed to connect after several attempts') #En caso de no poder conectarse, lanza una excepción

    def reconnect(self): #Método que se encarga de reconectar en caso de que la conexión se pierda
        if self.connection and not self.connection.is_closed:
            self.connection.close()
        self.connect()

    def send_message(self, message, routing_key='default'): #Método que se encarga de enviar un mensaje a una cola específica
        unique_id = f'sub-{routing_key}-{self.subscription_counter}'
        if not self.connection.is_connected():
            self.reconnect()
        try:
            self.connection.send(body=message, destination='/queue/'+routing_key, id=unique_id)
        except Exception as e:
            print(f"Error during sending message: {e}")
      
        self.subscription_counter += 1

rabbit_controller = RabbitController() 
