docker build -t detty_db ./db
docker run --name pg_db --rm -e POSTGRES_PASSWORD=password -d detty_db