FROM openjdk:17

VOLUME /tmp

COPY target/gateway-ms-1.0-SNAPSHOT.jar /app/gateway-ms-1.0-SNAPSHOT.jar

WORKDIR /app

ENTRYPOINT ["java", "-jar", "gateway-ms-1.0-SNAPSHOT.jar"]