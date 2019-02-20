FROM node:8

COPY ./app/package.json ./app/package.json
WORKDIR /app
RUN npm i
RUN npm run build --prod
RUN rm -r node_modules

COPY ./server/package.json ./server/package.json
WORKDIR /server
RUN npm i

COPY . .

WORKDIR /server
EXPOSE 3001
CMD ["node", "index.js"]