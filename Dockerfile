FROM docker.io/node:lts-alpine AS app

WORKDIR /app

COPY . .

RUN npm install


FROM postgres:latest AS postgres

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=microdb
ENV PGDATA=/var/lib/postgresql/data


FROM docker.io/node:lts-alpine AS base

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm" "run" "start" "api" ]
