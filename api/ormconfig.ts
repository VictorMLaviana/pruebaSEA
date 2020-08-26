require('dotenv').config();

import { ConnectionOptions } from 'typeorm';
import * as Entities from './src/repositories/entities';

const config: ConnectionOptions = {
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
  migrationsRun: true,
  cli: {
    migrationsDir: './src/database/migrations',
  },
  migrations: ['./src/database/migrations/*.ts'],
};

module.exports = {
  ...config,
};
