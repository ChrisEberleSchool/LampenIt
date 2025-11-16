FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY web-server.js ./web-server.js

COPY . .

EXPOSE 3000
CMD ["node", "web-server.js"]
