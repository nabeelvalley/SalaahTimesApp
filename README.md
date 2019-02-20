# Salaah Times App

A simple app to allow masaajid to 

## Bugs

- Glitchy when changing pages
- Does not load content if the home page was not loaded first
- Seems to be having some trouble when cookies are disabled
- PWA not caching network requests

## To Do

[X] Create server to handle JSON *times* requests from React App

[X] Build frontend with React fot the masjid listing

[X] Build frontend with React fot the Salaah times for a specific masjid

[X] Cache network requests with PWA

[X] Configure build and deploy pipeline

[X] Use Redux to manage global state

[ ] Refactor to an **actual** db (or at least provide a plugin that can be modified easily at a later stage)

[ ] Consider using a custom theme

[ ] Look at PWA notifications

## Deployment

The build/deployment is done in an IBM Cloud Toolchain, with the following scripts to build and deploy to Cloud Foundry 

### Build

```bash
#!/bin/bash
export NVM_DIR=/home/pipeline/nvm
export NODE_VERSION=8.12.0
export NVM_VERSION=0.29.0

npm config delete prefix \
  && curl https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | sh \
  && . $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default \
  && node -v \
  && npm -v

cd app
npm i
npm run --prod
rm -r node_modules

cd ..
cd server
npm i
```

### Deploy

```bash
#!/bin/bash
cf push "${CF_APP}"
```

## Resources

Salaah times from
https://www.salahtimes.com/south-africa/pretoria

Convert to JSON
https://www.csvjson.com/csv2json