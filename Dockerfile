FROM node:16-alpine

COPY . /app

WORKDIR /app

RUN npm install -g yarn
RUN yarn install

EXPOSE 3000

CMD [ "yarn", "dev" ]
