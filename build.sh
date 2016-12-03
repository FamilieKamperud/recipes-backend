#!/bin/bash

#docker build -t kamperud/recipe-backend .
#docker run -p 3000:3000 -d kamperud/recipe-backend

docker-compose build
docker-compose up
