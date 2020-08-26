import { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';

const symbolRequestTime = 'PluginRequestTimer';

export { symbolRequestTime };

export default fastifyPlugin(function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  const digits = 2;
  const header = 'X-Response-Time';
  fastify.addHook('onSend', (request: FastifyRequest, reply, payload, done) => {
    const hrDuration = process.hrtime(request[symbolRequestTime]);
    const duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6).toFixed(digits);
    reply.header(header, duration);
    done();
  });

  next();
});
