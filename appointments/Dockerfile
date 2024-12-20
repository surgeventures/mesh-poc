FROM node:18.17.1
RUN apt-get update && apt-get install -y iproute2
COPY package*.json .
RUN npm install
COPY tsconfig.json .
COPY src ./src
