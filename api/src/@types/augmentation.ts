import * as fastify from 'fastify';
import * as http from 'http';
import { Connection } from 'typeorm';
import * as admin from 'firebase-admin';

import { Repositories } from '../repositories';
import { User } from '../domains';
import { Config } from '../config';
import { symbolRequestTime } from '../loaders/response-time';

interface Orm {
  connection: Connection;
  repositories: Repositories;
}

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    blipp: () => void;
    config: Config;
    orm: Orm;
    firebase: admin.app.App;
    verifyIsAuth: () => void;
    verifyIsAdmin: () => void;
    verifyIsAdminSercomgas: () => void;
    canNominateForMarketer: (
      extractMarketerId: (request: FastifyRequest) => string
    ) => (request: FastifyRequest, reply) => Promise<void>;
    canShowNomination: (
      extractNominationId: (request: FastifyRequest) => string
    ) => (request: FastifyRequest, reply) => Promise<void>;
    canDeleteNomination: (
      extractNominationId: (request: FastifyRequest) => string
    ) => (request: FastifyRequest, reply) => Promise<void>;
    canListNominations: (
      extractMarketerId: (request: FastifyRequest) => string
    ) => (request: FastifyRequest, reply) => Promise<void>;
  }
  export interface FastifyRequest<
    HttpRequest = http.IncomingMessage,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
    Body = DefaultBody
  > {
    currentUser: User;
    symbolRequestTime: number;
  }
}
