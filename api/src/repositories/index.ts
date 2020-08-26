import { getUsersRepository } from './users';
import { getRolesRepository } from './roles';
import { UserRepository, RoleRepository } from '../domains';

interface Repositories {
  usersRepository: UserRepository;
  rolesRepository: RoleRepository;
}

const getRepositories = (): Repositories => {
  return {
    usersRepository: getUsersRepository(),
    rolesRepository: getRolesRepository(),
  };
};

export { Repositories, getRepositories };
