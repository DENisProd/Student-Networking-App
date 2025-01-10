FROM openjdk:17

VOLUME /tmp

COPY target/media-ms-1.0-SNAPSHOT.jar /app/media-ms-1.0-SNAPSHOT.jar

COPY .env.prod /app/.env

RUN apt-get update && apt-get install -y ffmpeg
ENV FFMPEG_PATH=/usr/bin/ffmpeg

WORKDIR /app

ENTRYPOINT ["java", "-jar", "media-ms-1.0-SNAPSHOT.jar"]