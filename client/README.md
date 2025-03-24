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
