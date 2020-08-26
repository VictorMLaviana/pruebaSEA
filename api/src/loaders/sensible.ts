import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import sensible from 'fastify-sensible';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.register(sensible);
  next();
});
