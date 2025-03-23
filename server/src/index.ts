import express from 'express';
import {createServer} from 'http';
import {config} from './config';
import {initDb, db} from './db';
import {startWSServer} from './ws-server';

initDb(config.db.user, config.db.password, config.db.host, config.db.port, config.db.database);

const app = express();
// @ts-expect-error - TS complains createServer not accepting args. Which is clearly wrong.
const httpServer = createServer(app);
startWSServer({
  httpServer,
  expressApp: app,
  port: config.wsPort,
  db: db(),
});
