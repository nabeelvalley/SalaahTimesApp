# Salaah Times App

## Running Develop

1. Ensure you are using `Node.js v10`
2. Install the dependencies in the `app` and `strapi` directories with `yarn`
3. Requires a Mongo Service to be running on `127.0.0.1:27017` (localhost)
4. Run the frontend from the `app` directory with `yarn start`
5. Run the strapi backend from the `strapi` directory with `yarn run develop`

Once ready, run `npm run develop`

## Bugs

- Glitchy when changing pages
- Does not load content if the home page was not loaded first
- Seems to be having some trouble when cookies are disabled
- PWA not caching network requests

## To Do

[X] Create server to handle JSON _times_ requests from React App

[X] Build frontend with React fot the masjid listing

[X] Build frontend with React fot the Salaah times for a specific masjid

[X] Cache network requests with PWA

[X] Configure build and deploy pipeline

[X] Use Redux to manage global state

[ ] Decide how long the |js|css|html| files should be cached

[ ] Refactor to an **actual** db (or at least provide a plugin that can be modified easily at a later stage)

[ ] Consider using a custom theme

[ ] Look at PWA notifications

[ ] Add announcement functionality

## Deployment

I'm deploying the app as a Docker Container as this seems to be the only method that reliably works everywhere (every other way is too platform specific)

I'm using Heroku currently, and the deployment process is as follows:

1. Build the docker image from the directory

```bash
docker build -t salaah-times .
```

2. Log in to Heroku

```bash
heroku login
```

3. Log in to the Container Registry

```bash
heroku container:login
```

4. Push the image, note that the `web` refers to the runner and not the app name

```bash
heroku container:push web
```

5. Deploy the image

```bash
heroku container:release web
```

## Resources

Salaah times from
https://www.salahtimes.com/south-africa/pretoria

Convert to JSON
https://www.csvjson.com/csv2json
