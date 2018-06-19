FROM node:9-alpine as builder

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 8080

COPY serve.sh /usr/local/bin
RUN chmod +x /usr/local/bin/serve.sh

CMD ["/usr/local/bin/serve.sh"]