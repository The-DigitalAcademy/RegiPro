FROM node:18.10.0-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/frontend /usr/share/nginx/html