# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html