FROM node:21-alpine

WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3333

CMD ["yarn", "dev"]
