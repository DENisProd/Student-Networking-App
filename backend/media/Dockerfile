FROM openjdk:17

VOLUME /tmp

COPY target/media-1.0-SNAPSHOT.jar /app/media-1.0-SNAPSHOT.jar

COPY .env.prod /app/.env

RUN apt update && apt install -y ffmpeg
ENV FFMPEG_PATH=/usr/bin/ffmpeg

WORKDIR /app

ENTRYPOINT ["java", "-jar", "media-1.0-SNAPSHOT.jar"]