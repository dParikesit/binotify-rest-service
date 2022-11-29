FROM node:lts-alpine
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN yarn global add nodemon

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait .
RUN chmod +x wait

RUN /app/wait && npx sequelize-cli db:migrate
RUN /app/wait && npx sequelize-cli db:seed:all

CMD ["yarn", "dev"]