FROM openjdk:17

VOLUME /tmp

COPY target/finder-1.0-SNAPSHOT.jar /app/finder-1.0-SNAPSHOT.jar

COPY .env.prod /app/.env

WORKDIR /app

ENTRYPOINT ["java", "-jar", "finder-1.0-SNAPSHOT.jar"]