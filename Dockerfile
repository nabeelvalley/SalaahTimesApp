# Install Node Modules
FROM node:10 as install-packages

COPY app/package.json ./app/package.json
COPY strapi/package.json ./strapi/package.json
RUN yarn global add strapi

WORKDIR /app
RUN yarn

WORKDIR /strapi
RUN yarn

RUN yarn build

WORKDIR /
COPY app ./app

WORKDIR /app
RUN yarn build

# Build Production Image
FROM node:10

RUN yarn global add strapi

WORKDIR /
COPY --from=install-packages strapi/build build
COPY --from=install-packages app/build build/public

EXPOSE 3001
CMD ["strapi", "start"]