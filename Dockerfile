FROM node:8

COPY ./server/package.json ./server/package.json
WORKDIR /server
RUN npm i

COPY ./app/package.json ./app/package.json
WORKDIR /app
RUN npm i

WORKDIR /
COPY . .

WORKDIR /app
RUN npm run build --prod
RUN rm -r node_modules

WORKDIR /server
EXPOSE 3001
CMD ["node", "index.js"]