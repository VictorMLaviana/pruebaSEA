import { FastifyInstance } from 'fastify';
import fastifyPlugin, { PluginOptions, nextCallback } from 'fastify-plugin';
import { Connection, getConnection } from 'typeorm';
import { getRepositories } from '../repositories';

export default fastifyPlugin(async function(fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) {
  try {
    const connection: Connection = getConnection();

    fastify.decorate('orm', {
      connection,
      repositories: getRepositories(),
    });
    fastify.addHook('onClose', async (instance, done) => {
      await instance.orm.connection.close();
      done();
    });
  } catch (e) {
    console.log('error databse', e);
  }
  next();
});
