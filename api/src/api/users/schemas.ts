import { FastifyInstance } from 'fastify';

const registerSchemas = (fastify: FastifyInstance): void => {
  fastify.addSchema({
    $id: 'Role',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
  });

  fastify.addSchema({
    $id: 'UserWithRoles',
    type: 'object',
    properties: {
      id: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      roles: {
        type: 'array',
        items: {
          $ref: 'Role#',
        },
      },
    },
  });

  fastify.addSchema({
    $id: 'User',
    type: 'object',
    properties: {
      id: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  });
};

export { registerSchemas };
