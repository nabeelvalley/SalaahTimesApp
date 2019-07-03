# Build React
FROM node:10 as install-packages

COPY app/package.json ./package.json

RUN npm i

COPY app .

RUN npm run build

# Assemble Production Image
FROM node:10

COPY strapi .
RUN npm i
RUN npm i -g strapi

RUN ls public

COPY --from=install-packages build public

RUN ls public

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]