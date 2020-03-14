# FROM node:10 as install-packages-strapi

# COPY strapi/package.json ./package.json

# RUN npm i -g strapi

# Assemble Production Image
FROM node:10
# COPY --from=install-packages-strapi node_modules node_modules

COPY strapi/package.json ./package.json

RUN npm i

COPY strapi .

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]