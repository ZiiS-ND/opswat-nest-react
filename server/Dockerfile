FROM node:21-alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon --silent
RUN yarn install
RUN apk add --no-cache bash

EXPOSE 5500

CMD ["yarn", "start:dev"]