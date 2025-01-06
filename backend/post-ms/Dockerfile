FROM openjdk:17

VOLUME /tmp

COPY target/post-ms-1.0-SNAPSHOT.jar /app/post-ms-1.0-SNAPSHOT.jar

COPY .env.prod /app/.env

WORKDIR /app

ENTRYPOINT ["java", "-jar", "post-ms-1.0-SNAPSHOT.jar"]