FROM node:16-alpine

COPY . /app

WORKDIR /app

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev" ]
