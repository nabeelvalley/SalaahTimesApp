# Install Node Modules
FROM node:10 as install-packages

COPY app/package.json ./app/package.json
COPY strapi/package.json ./strapi/package.json

WORKDIR /app
RUN npm i

WORKDIR /strapi
RUN npm i

# Build Strapi
WORKDIR /
COPY strapi ./strapi

WORKDIR /strapi
RUN npm run build

# Build React
WORKDIR /
COPY app ./app

WORKDIR /app
RUN npm run build

# Assemble Production Image
FROM node:10

RUN yarn add strapi

WORKDIR /
COPY --from=install-packages strapi/build build
COPY --from=install-packages app/build build/public

EXPOSE 3001
CMD ["npm", "start"]