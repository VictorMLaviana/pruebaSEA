import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import helmet from 'fastify-helmet';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.register(helmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' } });
  next();
});
