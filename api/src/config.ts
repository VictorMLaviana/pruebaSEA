require('dotenv').config();

import { ConnectionOptions } from 'typeorm';
import * as Entities from './repositories/entities';

const configOrm: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  ...(process.env.DATABASE_PORT ? { port: +process.env.DATABASE_PORT } : {}),
  extra: {
    socketPath: process.env.DATABASE_HOST,
  },
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  uuidExtension: 'uuid-ossp',
  entities: Object.values(Entities),
  logging: true,
  migrationsRun: false,
};

interface Config {
  PORT: number;
  HOST: string;
  configOrm: ConnectionOptions;
  dockerRuntime: boolean;
}

const config: Config = {
  PORT: +process.env.PORT || 8080,
  HOST: process.env.HOST,
  dockerRuntime: process.env.DOCKER_RUN_TIME === '1',
  configOrm,
};

export { Config };

export default config;
