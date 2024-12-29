FROM node:20

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 5001

CMD ["yarn", "start:dev"]
