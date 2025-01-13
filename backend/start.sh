mvn clean
mvn package

docker compose -f docker-compose-prod.yml build --no-cache
docker compose -f docker-compose-prod.yml up -d
docker ps

# docker image prune -f
# docker system df
# docker builder prune