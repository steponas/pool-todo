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

## Building
To build for your local arch, you can run:
```
npm run make
```

To build for other archs, leverage `forge` args:
```
npm run make -- --platform=win32 --arch=x64
npm run make -- --platform=darwin --arch=x64|arm64
```

You will find the outputs in `client/out/make`.

## Resetting the client settings state
Settings are persisted on disk, and stay there forever. Unless...

You can reset the settings by deleting the `settings.json` file in the client folder.

Or, you can reset the database (see server [README](../server/README.md)), which will
force the client to fail to auth and it will show a button to reset the settings from the UI.
