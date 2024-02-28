FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5500

CMD [ "yarn", "start:dev" ]
