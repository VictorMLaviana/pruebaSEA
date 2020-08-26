import 'reflect-metadata';

import createServer from './app';
import config from './config';
import { Server } from 'http';

createServer().then((server) => {
  server
    .listen({ port: config.PORT, ...(config.dockerRuntime && { host: '0.0.0.0' }) })
    .then(() => {
      server.blipp();
    })
    .catch((err) => {
      console.error(err);
    });
});
