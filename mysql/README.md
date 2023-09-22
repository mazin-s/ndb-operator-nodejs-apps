# MYSQL NodeJS API

This repo was created to test https://github.com/nutanix-cloud-native/ndb-operator MYSQL app connectivity.

## Requirements:
Using node 16+

## Instructions to initialize

1. Edit database.js/db.env with your config. Include the following:
   - DBHOST=11.11.111.111
   - DATABASE=database_name
   - USERNAME=root
   - PASSWORD=password
2. Install the dependencies with `npm i`.
3. Launch the application with `npm start`.

## Docker Image:
https://hub.docker.com/repository/docker/mazins/ndb-operator-mysql/general
