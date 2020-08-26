import { EntitySchema } from 'typeorm';

import { baseSchema } from '../base';
import { User } from 'domains/index';

const UserEntity = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    firstName: {
      type: String,
      name: 'first_name',
      nullable: false,
    },
    lastName: {
      type: String,
      name: 'last_name',
    },
    email: {
      type: String,
      nullable: false,
    },
    ...baseSchema,
  },
  relations: {
    roles: {
      type: 'many-to-many',
      target: 'roles',
      primary: true,
      joinTable: {
        name: 'user_role',
        joinColumn: {
          name: 'user_id',
        },
        inverseJoinColumn: {
          name: 'role_id',
        },
      },
    },
  },
});

export { UserEntity };
