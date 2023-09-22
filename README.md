# NDB Operator NodeJS Apps

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Instructions to Initialize](#instructions-to-initialize)
- [API](#api)
- [Docker Images](#docker-Images)


## Introduction


This repo was created to test https://github.com/nutanix-cloud-native/ndb-operator app connectivity. It contains 4 nodejs apps: mysql, postgres, mongodb, mssql. The API's are the same and the config file is the same with the exception of an additional property for MSSQL (which will be highlighted below).

## Requirements:
- Each app has its own unique dependencies (view each package.json for more information)
- Ensure you are running node 16+

## Instructions to Initialize

1. Edit database.js/db.env with your config. Include the following:
   - DBHOST=11.11.111.111
   - DATABASE=database_name
   - USERNAME=root
   - PASSWORD=password
   - MSSQL_INSTANCE_NAME=instance_name *only for MSSQL
2. Install the dependencies with `npm i`.
3. Launch the application with `npm start`.

## Testing with Postman

All apps listen on port 3000 and all apps have the same endpoints.

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/persons`                               | Retrieve all persons.                    |
| `GET`    | `/persons/1`                             | Retrieve person #1.                      |
| `POST`   | `/persons`                               | Create a new person.                     |
| `PUT`    | `/persons/1`                             | Update person #1.                        |
| `DELETE` | `/persons/1`                             | Delete a person #1.                      |


## Docker Images:

1. mysql: [mazins/ndb-operator-mysql:latest](https://hub.docker.com/repository/docker/mazins/ndb-operator-mysql/general)
2. postgres: [manavrajvanshinx/best-app:latest](https://hub.docker.com/r/manavrajvanshinx/best-app/tags)
3. mongodb: [mazins/ndb-operator-mongodb:latest](https://hub.docker.com/repository/docker/mazins/ndb-operator-mongodb/general)
4. mssql: [mazins/ndb-operator-mssql:latest](https://hub.docker.com/repository/docker/mazins/ndb-operator-mssql/general)