import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import oas from 'fastify-oas';

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  fastify.register(oas, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'code challange',
        description: 'code challange api documentation',
        version: '0.1.0',
      },
      tags: [{ name: 'users', description: 'User related end-points' }],
      consumes: ['application/json'],
      produces: ['application/json'],
      servers: [
        {
          url: fastify.config.HOST,
          description: 'Optional server description, e.g. Main (production) server',
        },
      ],
    },
    exposeRoute: true,
  });
  next();
});
