FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY authors-service.js authors-service.js
CMD npm run start-authors
