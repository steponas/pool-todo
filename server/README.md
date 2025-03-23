## The server for the TODO app

This Node server uses WebSockets instead of REST as I think
it fits the use case better.

## Starting the local DB
The database is Postgres, and runs with docker.
The setup files are located in the `db` folder. They are run automatically
the first time the image runs (and volume is empty).
```
docker-compose -f db/docker-compose.yml up
```

In case you want to destroy the DB storage layer, you can run:
```
docker-compose -f db/docker-compose.yml down -v
```

## Starting the server

The server run in environments where node (>v20) is available.

```
npm install
npm run start
```

I did not dockerize the server - but ideally it should have been.

## Running the tests

The tests are written in Jest, and can be run with:
```
npm run test
```
