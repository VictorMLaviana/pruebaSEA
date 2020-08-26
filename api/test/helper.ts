import Fastify from 'fastify';
import fp from 'fastify-plugin';
import App from '../src/app';

export function config() {
  return {};
}

// automatically build and tear down our instance
export async function build() {
  const app = await App();
  return app;
}
