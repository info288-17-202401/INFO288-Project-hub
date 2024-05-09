import pika, os
from dotenv import load_dotenv

load_dotenv('.env.api')

credentials = pika.PlainCredentials(os.getenv("RABBIT_USER"),os.getenv("RABBIT_PASSWORD"))
parameters = pika.ConnectionParameters(os.getenv("RABBIT_HOST"), os.getenv("RABBIT_PORT"), '/', credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()  