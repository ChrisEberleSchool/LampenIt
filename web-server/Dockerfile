FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY build ./build
COPY web-server.js ./web-server.js

EXPOSE 3000
CMD ["node", "web-server.js"]
