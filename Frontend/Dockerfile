FROM node:9-alpine as builder

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.13.3-alpine

COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
