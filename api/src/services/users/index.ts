import { User, UserRepository, RoleRepository, Role } from '../../domains';
import { curry } from '../../libs/toolkits';
import { In } from 'typeorm';

const getAll = async (
  { usersRepository }: { usersRepository: UserRepository },
  query: {
    limit: number;
    offset: number;
  }
): Promise<{ users: User[]; count: number }> => {
  const { limit = 10, offset = 0 } = query;
  const [users, count] = await usersRepository.findAndCount({
    take: limit,
    skip: offset,
    relations: ['roles'],
  });
  return { users, count };
};

const getById = async ({ usersRepository }: { usersRepository: UserRepository }, { id }): Promise<User> => {
  const user = await usersRepository.findOneOrFail({
    where: { id },
    relations: ['roles'],
  });
  return user;
};

const remove = async ({ usersRepository }: { usersRepository: UserRepository }, { id }): Promise<User> => {
  const user = await usersRepository.findOneOrFail(id);
  await usersRepository.delete(user.id);
  return user;
};

const update = async (
  { usersRepository, rolesRepository }: { usersRepository: UserRepository; rolesRepository: RoleRepository },
  { id, newUser }: { id: string; newUser: User }
) => {
  const user = await usersRepository.findOneOrFail({ id });
  const roles: Role[] = newUser.roles
    ? await rolesRepository.find({
        where: {
          id: In(newUser.roles),
        },
      })
    : null;
  return usersRepository.save({
    ...user,
    ...newUser,
    ...(roles && { roles }),
    updatedAt: new Date(),
  });
};

const create = async (
  { usersRepository, rolesRepository }: { usersRepository: UserRepository; rolesRepository: RoleRepository },
  { newUser }: { newUser: User }
) => {
  const roles: Role[] = await rolesRepository.find({
    where: {
      id: In(newUser.roles),
    },
  });
  const user = await usersRepository.save({
    ...newUser,
    roles,
  });
  return user;
};

const getUser = curry(getById);
const getUsers = curry(getAll);
const removeUser = curry(remove);
const updateUser = curry(update);
const createUser = curry(create);

export { getUser, getUsers, removeUser, updateUser, createUser };
