const Blipp = require('fastify-blipp');
import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.register(Blipp);
  next();
});
