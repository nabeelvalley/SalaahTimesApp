# Install Node Modules
FROM node:12 as install-packages

COPY app/package.json ./app/package.json
COPY server/package.json ./server/package.json

WORKDIR /app
RUN yarn

WORKDIR /server
RUN yarn

WORKDIR /
COPY app ./app

WORKDIR /app
RUN yarn build

# Build Production Image
FROM node:12

WORKDIR /
COPY --from=install-packages app/build ./app/build
COPY --from=install-packages server ./server
COPY server server

WORKDIR /server
EXPOSE 3001
CMD ["node", "index.js"]