FROM node:lts-alpine
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN yarn global add nodemon
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

COPY . .
CMD ["yarn", "dev"]