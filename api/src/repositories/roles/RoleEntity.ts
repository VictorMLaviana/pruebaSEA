import { EntitySchema } from 'typeorm';

import { baseSchema } from '../base';
import { Role } from 'domains/index';

const RoleEntity = new EntitySchema<Role>({
  name: 'roles',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
      nullable: false,
    },
    description: {
      type: String,
    },
    ...baseSchema,
  },
  relations: {
    users: {
      type: 'many-to-many',
      target: 'users',
      primary: true,
      joinTable: {
        name: 'user_role',
        joinColumn: {
          name: 'role_id',
        },
        inverseJoinColumn: {
          name: 'user_id',
        },
      },
    },
  },
});

export { RoleEntity };
