import { BaseEntity } from '../share/base';
import { User } from '../user/entity';

type RoleNames = 'admin' | 'editor' | 'reader';

interface Role extends BaseEntity {
  id?: string;
  name: RoleNames;
  description?: string;
  users?: User[];
}

const isAdmin = (role: Role) => role.name === 'admin';
const isEditor = (role: Role) => role.name === 'editor';
const isReader = (role: Role) => role.name === 'reader';

const methods = {
  isEditor,
  isAdmin,
  isReader,
};

export { Role, methods };
