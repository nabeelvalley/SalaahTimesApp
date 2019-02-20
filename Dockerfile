FROM node:8
COPY . .
RUN cd app
RUN npm i && npm run build --prod && rm -r node_modules
RUN cd ../server
RUN npm i
EXPOSE 3001
CMD ["node", "server/index.js"]