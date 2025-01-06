FROM openjdk:17

VOLUME /tmp

COPY target/category-ms-1.0-SNAPSHOT.jar /app/category-ms-1.0-SNAPSHOT.jar

COPY .env.prod /app/.env

WORKDIR /app

ENTRYPOINT ["java", "-jar", "category-ms-1.0-SNAPSHOT.jar"]