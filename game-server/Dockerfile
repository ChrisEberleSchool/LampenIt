FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY game-server.js ./game-server.js

COPY . .

EXPOSE 3000

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "game-server.js"]