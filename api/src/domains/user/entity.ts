import { BaseEntity } from '../share/base';
import { Role, methods as roleMethods } from '../role/entity';

interface User extends BaseEntity {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  roles?: Role[];
}

const isRole = (isRole: (Role) => boolean) => (user: User): boolean => {
  for (let role of user.roles || []) {
    if (isRole(role)) {
      return true;
    }
  }
  return false;
};

const isAdmin = isRole(roleMethods.isAdmin);
const isEditor = isRole(roleMethods.isEditor);
const isReader = isRole(roleMethods.isReader);

const methods = {
  isAdmin,
  isEditor,
  isReader,
};

export { User, methods };
