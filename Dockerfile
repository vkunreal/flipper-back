FROM node:20
WORKDIR /app
EXPOSE 5000
COPY package.json .
RUN yarn
COPY . .
ENV PORT=5000
RUN yarn build
CMD ["yarn", "start"]