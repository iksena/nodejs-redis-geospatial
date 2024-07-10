# nodejs-redis-geospatial
Node.js application with Redis Geospatial to find nearby shops

## Getting started

This is a Node.js backend application with Express.js framework. It connects to a Redis and PostgreSQL database. You will need to setup your machine to run these databases locally. Follow [this tutorial](https://redis.io/docs/latest/operate/oss_and_stack/install/) to setup Redis and [this tutorial](https://www.postgresql.org/download/macosx/) to setup PostgreSQL.

To use this app, you can use [Postman](https://www.postman.com/downloads/) or [Insomnia](https://www.postman.com/downloads/) REST API client.

## Setup project

1. Setup and install NPM and Node.js in your machine by following [this documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Set Node.js version to v20 (LTS Iron)
3. Copy `.env.example` file to `.env` and set the configuration of PostgreSQL and Redis based on your setup
4. Run `npm install` to install dependencies
5. Install Bunyan logger by running `npm i -g bunyan`
6. Run the app by running `npm start | bunyan`
7. The app will be running in this host http://localhost:3000
8. Press Control+C to close the app

## Usage

There are some endpoints you can use to try the app:

### GET /shops
Get all stored shops
```shell
curl --location 'http://localhost:3000/shops'
```

### GET /shops/:id
Get a shop by id
```shell
curl --location 'http://localhost:3000/shops/36980d97-9262-4f33-b3d7-9e5f8e77513a'
```

### POST /shops
Create a shop
```shell
curl --location 'http://localhost:3000/shops' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Station 4",
    "latitude": 38.8104049,
    "longitude": -122.2469854
}'
```

### PATCH /shops/:id
Edit properties of a shop
```shell
curl --location --request PATCH 'http://localhost:3000/shops/aff1ffe1-7d39-4b59-9396-9ed3f3680e6c' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Station New"
}'
```

### DELETE /shops/:id
Delete a shop
```shell
curl --location --request DELETE 'http://localhost:3000/shops/0a89c2e4-f0d8-4947-a854-e165af53d5a9'
```

### GET /shops?radius={}&latitude={}&longitude={}
Find nearby shops from a coordinate and a radius in meters
```shell
curl --location 'http://localhost:3000/shops?radius=5000&latitude=37.810404&longitude=-122.2469854'
```