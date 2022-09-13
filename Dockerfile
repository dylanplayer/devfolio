FROM node:16-alpine
RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

RUN mkdir -p /app
ENV PORT 3000

COPY . /app
WORKDIR /app

RUN yarn install

RUN yarn build
RUN npx prisma generate

EXPOSE 3000
CMD [ "yarn", "run", "prod" ]
