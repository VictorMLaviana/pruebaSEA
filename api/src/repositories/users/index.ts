import { getRepository } from 'typeorm';

import { UserEntity } from './UserEntity';
import { User } from 'domains/index';

const getUsersRepository = () => getRepository<User>(UserEntity);

export { getUsersRepository };
