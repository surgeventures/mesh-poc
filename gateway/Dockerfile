FROM node:22.10.0
RUN apt-get update && apt-get install -y iproute2
WORKDIR /app
COPY package*.json .
RUN npm install
COPY mesh.config.ts .
COPY gateway.config.ts .
COPY schemas schemas
