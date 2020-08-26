import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import cors from 'fastify-cors';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.register(cors, { exposedHeaders: 'Content-Disposition' });
  next();
});
