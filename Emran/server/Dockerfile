FROM node:14-slim

WORKDIR /usr/src/app2

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "index.js" ]