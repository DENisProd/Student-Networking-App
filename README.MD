# Dev alpha version of Networking application for students

## Stack:
- Backend: Java Spring, Minio, RabbitMQ, PostgreSQL, FFmpeg.
- Frontend: TypeScript, ReactJS, Zustand, SwiperJS, SASS, Vite.

## Microservices overview:
The backend of this project was built using microservices (MS) architecture.

### Media MS:
Receive image or video orientation from the remote backend and convert the media to a compressed format with scaling and cropping. The answer is transmitted to the remote backend via the RabbitMQ protocol.

### Category MS:
CRUD operations for categories

### Finder MS:

### Gateway MS:


## How to run

```bash
docker compose -f ./backend/docker-compose.yml up -d
```