FROM docker.io/node:lts-alpine AS dev

WORKDIR /app

COPY . .

ENV NODE_ENV=dev

RUN npm install

RUN npx nest build entities --tsc


FROM docker.io/node:lts-alpine AS prod

WORKDIR /app

COPY . .

ENV NODE_ENV=prod

RUN npm install



