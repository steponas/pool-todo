## The server for the TODO app

This Node server uses WebSockets instead of REST as I think
it fits the use case better.

## Starting the local DB
The database is Postgres, and runs with docker.
The setup files are located in the `db` folder.
```
docker-compose -f db/docker-compose.yml up
```
