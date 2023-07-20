FROM node:18-alpine

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm rebuild bcrypt --build-from-source
CMD npm run start:dev:docker