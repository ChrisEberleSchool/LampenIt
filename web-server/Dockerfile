FROM node:14

WORKDIR /app

COPY web-server.js .
COPY www ./www
COPY images ./images
COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["node", "web-server.js"]