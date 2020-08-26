import path from 'path';

import fastify from 'fastify';
import AutoLoad from 'fastify-autoload';
import { createConnection } from 'typeorm';

function ajvPlugin(ajv, options): any | String {
  ajv.addKeyword('isFileType', {
    compile: (schema, parent, it) => {
      // Change the schema type, as this is post validation it doesn't appear to error.
      parent.type = 'file';
      delete parent.isFileType;
      return () => true;
    },
  });

  return ajv;
}

async function createServer() {
  const server = fastify({ logger: true, ajv: { plugins: [[ajvPlugin]] } });

  await createConnection();

  server.register(AutoLoad, {
    dir: path.join(__dirname, 'loaders'),
    options: {},
    includeTypeScript: true,
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'api'),
    options: { prefix: '/api' },
    includeTypeScript: true,
  });
  server.get('/', (req, reply) => {
    reply.send({
      ok: true,
    });
  });
  server.get('/api', (req, reply) => {
    reply.send({
      ok: true,
    });
  });
  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.internalServerError();
  });
  process.on('unhandledRejection', function(error) {
    console.error('Aplicaion crash', error);
  });

  return server;
}

export default createServer;
