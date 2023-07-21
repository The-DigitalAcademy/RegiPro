FROM node:18.7.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
CMD ["yarn","run","start"]

EXPOSE 8080