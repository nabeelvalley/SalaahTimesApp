# Salaah Times App

## Running Develop

1. Ensure you are using `Node.js v10`
2. Install the dependencies in the `app` and `strapi` directories with `yarn`
3. Requires a Mongo Service to be running on `127.0.0.1:27017` (localhost)
4. Run the frontend from the `app` directory with `yarn start`
5. Run the strapi backend from the `strapi` directory with `yarn run develop`

Once ready, run `npm run develop`

## Create/Update Masjid Times

1. Open the `/admin` page of the Strapi Application ([live here](https://salaah-times.herokuapp.com/admin) and login)

![Admin Page](.readme/images/login.png)

2. After logging in you will see the homepage of the admin section. Now click on the `Masjids` link in the `Content-Types` section in the left panel.

![Home Page](.readme/images/admin-home.png)

> If you can only see the `Users` link it means that things did not load correctly, just do a hard refresh on your browser ([more information here](https://fabricdigital.co.nz/blog/how-to-hard-refresh-your-browser-and-clear-cache)) until you can see the same sections as above, and then click on `Masjids`

3. You should now see the Masjid listing screen below

![Masjid Listing](.readme/images/masjid-listing.png)

4. Click on the blue `Add New Masjid` button at the top right to create a new Masjid

![Edit Screen](.readme/images/edit-screen.png)

> If you would like to instead edit the times for an existing Masjid you can instead just click the row with the masjid details which will take you to the same edit screen as above

5. Fill in the relevant fields for the Masjid (all times are not required). Note that when filling in times to please use the am/pm format (eg. `05:30pm`) as can be seen in the example below

![Times Example](.readme/images/times-example.png)

6. Once you are done entering the relevant details click the blue `Save` button at the top, and that's it.

## Exporting Times

If you want to export these times as a text format, this can be done by clicking on the `Salaah Times` heading in the app view. The times will then be copied to your clipboard and you can paste them wherever you like

## Bugs

- Does not load content if the home page was not loaded first

## To Do

[X] Create server to handle JSON _times_ requests from React App

[X] Build frontend with React for the masjid listing

[X] Cache network requests with PWA

[X] Configure build and deploy pipeline

[ ] Decide how long the |js|css|html| files should be cached

[X] Refactor to an **actual** db (or at least provide a plugin that can be modified easily at a later stage)

[X] Consider using a custom theme

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
