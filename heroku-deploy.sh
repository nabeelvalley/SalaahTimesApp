#!/bin/bash
docker build -t salaah-times .
heroku container:login
heroku container:push web --app=salaah-times
heroku container:release web  --app=salaah-times