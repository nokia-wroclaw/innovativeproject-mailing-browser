FROM node:9-alpine

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN  npm install --production --silent


# Bundle app source
COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "./bin/www"]
