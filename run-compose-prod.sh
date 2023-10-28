#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=tmakinbayo

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export API_KEY=$2
export DEBUG=$3
export POSTGRES_DB=$4
export POSTGRES_USER=$5
export POSTGRES_PASSWORD=$6
export NEW_VERSION=$7

# docker-compose -f docker-compose.prod.yml build --no-cache
# docker-compose -f docker-compose.prod.yml up -d

COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml build --no-cache
COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml up -d 

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec ec2-user-api-1 python /src/manage.py makemigrations 
docker exec ec2-user-api-1 python /src/manage.py migrate