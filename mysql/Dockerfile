FROM node:16

WORKDIR /usr/src/app
COPY package.json ./
COPY config/ config/
COPY server.js ./
COPY app/ app/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]