docker swarm init 
docker network create --driver overlay --attachable project_hub_overlay


database
docker build -t project_hub_db . -f ./Dockerfile.db
docker run --name project_hub_db --env-file ./.env.db --network project_hub_overlay -p 2500:5432 -d project_hub_db


api
bash 
>> dev 

docker build -t project_hub_api . -f ./Dockerfile.api.dev
docker run --name project_hub_api --hostname project_hub_api --mount type=bind,source=.,target=/app  --env-file ./.env.api --network project_hub_overlay -p 8000:8000 -d project_hub_api


Frontend
docker build -t project_hub_frontend . -f ./Dockerfile.frontend.dev
docker run --name project_hub_frontend --mount type=bind,source={path},target=/app/src --env-file ./.env --network project_hub_overlay -p 2530:5173 -d project_hub_frontend


Broker
docker build -t project_hub_broker . -f ./Dockerfile.rabbitmq
docker run --name project_hub_broker --env-file ./.env.rabbitmq --network project_hub_overlay -p 2550:5672 -p 2560:15672 -d project_hub_broker



DOCKER COMPOSE DEV

para desarrollo ejecutar solo
docker-compose up -d