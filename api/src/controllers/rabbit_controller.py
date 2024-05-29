import pika, os, time
from dotenv import load_dotenv
import stomp
import logging


logging.basicConfig(level=logging.INFO)

load_dotenv('.env.api')

credentials = pika.PlainCredentials(os.getenv("RABBIT_USER"),os.getenv("RABBIT_PASSWORD"))
parameters = pika.ConnectionParameters(os.getenv("RABBIT_HOST"), os.getenv("RABBIT_PORT"), '/', credentials, heartbeat=120)

class MyListener(stomp.ConnectionListener):
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
        

class RabbitController:
    def __init__(self):
        self.connection = None
        self.connect()
        self.subscription_counter = 0
        
    def connect(self, retries=10, delay=10):
        attempt = 0
        while attempt < retries:
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
        raise Exception('Failed to connect after several attempts')

    def reconnect(self):
        if self.connection and not self.connection.is_closed:
            self.connection.close()
        self.connect()

    def send_message(self, message, routing_key='default'):
        unique_id = f'sub-{routing_key}-{self.subscription_counter}'
        if not self.connection.is_connected():
            self.reconnect()
        try:
            self.connection.send(body=message, destination='/queue/'+routing_key, id=unique_id)
        except Exception as e:
            print(f"Error during sending message: {e}")
      
        self.subscription_counter += 1

rabbit_controller = RabbitController()
