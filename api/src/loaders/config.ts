import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import config from '../config';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.decorate('config', config);
  fastify.decorateRequest('PluginRequestTimer', null);

  fastify.addHook('onRequest', (request, reply, done) => {
    request['PluginRequestTimer'] = process.hrtime();
    done();
  });
  next();
});
