FROM node:18.9.0

RUN mkdir -p /app
ENV PORT 3000

COPY . /app
WORKDIR /app

RUN yarn install --frozen-lockfile --ignore-engines

RUN npx prisma generate
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "run", "prod" ]
