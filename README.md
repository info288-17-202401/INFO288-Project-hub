## network

docker network create red_project_hub

## database

```bash
docker build -t project_hub_db . -f ./Dockerfile.db

```

```bash
docker run --name project_hub_db --env-file ./.env.db --network red_project_hub -p 2500:5432 -d project_hub_db

```

## api

```bash
docker build -t project_hub_api . -f ./Dockerfile.api

```

```bash
docker run --name project_hub_api -v /app:/code/app --env-file ./.env.api --network red_project_hub -p 2520:5000 -d project_hub_api

```

## Frontend

```bash
docker build -t project_hub_frontend . -f ./Dockerfile.frontend.dev
```

```bash
docker run --name project_hub_frontend --mount type=bind,source="$PWD"/src,target=/app/src --env-file ./.env.frontend --network red_project_hub -p 2530:5173 -d project_hub_frontend

```
