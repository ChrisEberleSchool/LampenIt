FROM node:14

WORKDIR /app

# Copy only package.json for caching npm install
COPY package.json .

RUN npm install
RUN npm install -g nodemon

# Expose the port
EXPOSE 3000

# Use npm dev script for nodemon
CMD ["npm", "run", "dev"]
