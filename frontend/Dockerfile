FROM node:18-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN apk add gettext

RUN yarn build --base-href

FROM nginx:latest

COPY --from=build /app/dist/frontend /usr/share/nginx/html

EXPOSE 80