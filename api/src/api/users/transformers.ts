import { User, Role } from '../../domains';
import { normalize, transformEntity } from '../../utils/api/transformer';

function normalizeUser(object): User {
  return <User>normalize({}, object);
}

function transformUser(user: User) {
  return transformEntity(user);
}

function transformRole(role: Role) {
  return transformEntity(role);
}
export { transformUser, normalizeUser, transformRole };
