## This is the Electron (client) App for the TODO Challenge.

## Folder Structure

```
src/
  main/ -- electron related code
  renderer/ -- the React UI application
```

## Configuring the WebSocket server

If running both the server and the client on the same machine then no
configuration is needed.

If not local, the WebSocket server address is configured in `client/src/renderer/ws/config.ts`.
Make sure it points to the correct address when testing.


## Running in dev mode
```
cd $THIS_FOLDER
npm install
npm run start
```

## Running the tests
```
npm run test
```

## Building the app

I've created convenience scripts to build the app for MacOS (both CPUs) and Windows.
```

```
