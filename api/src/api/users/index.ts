import { PluginOptions, nextCallback } from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

import { registerSchemas } from './schemas';
import { transformUser, normalizeUser, transformRole } from './transformers';
import {
  GET_USERS_SCHEMA,
  GET_USER_SCHEMA,
  DELETE_USER_SCHEMA,
  UPDATE_USER_SCHEMA,
  GET_ROLES,
  CREATE_USER_SCHEMA,
} from './swagger';
import { getUsers, getUser, removeUser, updateUser, createUser } from '../../services/users';

export default (fastify: FastifyInstance, opts: PluginOptions, next: nextCallback) => {
  registerSchemas(fastify);

  fastify.route({
    method: 'GET',
    url: '/users',
    schema: GET_USERS_SCHEMA,
    handler: async (req, reply) => {
      try {
        const { limit = 10, offset = 0 } = req.query;
        const { users, count } = await getUsers(
          { usersRepository: fastify.orm.repositories.usersRepository },
          {
            limit,
            offset,
          }
        );
        reply.send({ users: users.map((user) => transformUser(user)), count });
      } catch (error) {
        fastify.log.error(error);
        reply.badRequest();
      }
    },
  });

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    schema: GET_USER_SCHEMA,
    handler: async (req, reply) => {
      try {
        const user = await getUser(
          { usersRepository: fastify.orm.repositories.usersRepository },
          {
            id: req.params.id,
          }
        );
        reply.send({ user: transformUser(user) });
      } catch (error) {
        fastify.log.error(error);
        reply.notFound();
      }
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    schema: DELETE_USER_SCHEMA,
    handler: async (req, reply) => {
      try {
        const user = await removeUser(
          { usersRepository: fastify.orm.repositories.usersRepository },
          { id: req.params.id }
        );
        reply.code(201).send({ user: transformUser(user) });
      } catch (error) {
        fastify.log.error(error);
        reply.badRequest();
      }
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    schema: UPDATE_USER_SCHEMA,
    handler: async (req, reply) => {
      try {
        const userSaved = await updateUser(
          {
            usersRepository: fastify.orm.repositories.usersRepository,
            rolesRepository: fastify.orm.repositories.rolesRepository,
          },
          { id: req.params.id, newUser: normalizeUser(req.body) }
        );
        reply.send({ user: transformUser(userSaved) });
      } catch (error) {
        fastify.log.error(error);
        reply.badRequest();
      }
    },
  });

  fastify.route({
    method: 'POST',
    url: '/users',
    schema: CREATE_USER_SCHEMA,
    handler: async (req, reply) => {
      try {
        const user = await createUser(
          {
            usersRepository: fastify.orm.repositories.usersRepository,
            rolesRepository: fastify.orm.repositories.rolesRepository,
          },
          { newUser: normalizeUser(req.body) }
        );
        reply.send({ user: transformUser(user) });
      } catch (error) {
        fastify.log.error(error);
        reply.badRequest();
      }
    },
  });

  fastify.route({
    method: 'GET',
    url: '/roles',
    schema: GET_ROLES,
    handler: async (req, reply) => {
      try {
        const { limit = 10, offset = 0 } = req.query;
        const [roles, count] = await fastify.orm.repositories.rolesRepository.findAndCount({
          where: {
            take: limit,
            skip: offset,
          },
        });
        reply.send({ roles: roles.map(transformRole), count });
      } catch (error) {
        fastify.log.error(error);
        reply.badRequest();
      }
    },
  });

  next();
};
