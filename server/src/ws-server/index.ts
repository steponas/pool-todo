import {Express} from 'express';
import {Server} from 'socket.io';
import {Knex} from 'knex';
import {createServer} from 'http';
import {logger} from '../log';
import {setupHandlers} from './handlers';

interface Options {
  httpServer: ReturnType<typeof createServer>;
  expressApp: Express;
  port: number;
  db: Knex;
}

export const startWSServer = (opts: Options) => {
  const io = new Server(opts.httpServer, {
    cors: {
      origin: (origin, callback) => {
        // TODO: for prod use, this should have a list of allowed origins
        callback(null, true);
        // if (!origin || ['file://', 'http://localhost:3000'].includes(origin)) {
        //   callback(null, true);
        // } else {
        //   callback(new Error(`Origin ${origin} not allowed`));
        // }
      },
    }
  });

  io.on('connection', (client) => {
    logger.info('a user connected');
    setupHandlers(io, client);
  });
  io.on('disconnect', () => {
    logger.info('a user disconnected');
  });

  opts.httpServer.listen(opts.port);
};
