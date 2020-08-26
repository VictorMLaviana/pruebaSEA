import { getRepository } from 'typeorm';

import { RoleEntity } from './RoleEntity';
import { Role } from 'domains/index';

const getRolesRepository = () => getRepository<Role>(RoleEntity);

export { getRolesRepository };
