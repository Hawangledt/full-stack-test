FROM node:18.16.1 as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install --omit=dev

COPY . .

ENV REACT_APP_API=http://localhost:3333

RUN npm run build

EXPOSE 3000
