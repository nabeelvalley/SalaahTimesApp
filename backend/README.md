# Salaah Times Strapi

Strapi Repo for the Salaah Times App Backend.

> Requires a Mongo Service to be running on localhost

Once ready, run `yarn run develop`

## Production

Note that the host for development is set to `0.0.0.0` due to a current bug with strapi, next time the application is updated it should be safe to convert this to use localhost

If the application is taking too long to boot on Heroku and is getting "Took too long to bind to port" error take a look at [this](https://devcenter.heroku.com/articles/limits#boot-timeout)
