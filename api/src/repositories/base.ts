import { EntitySchemaColumnOptions } from 'typeorm';

const baseSchema = {
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions,
  deletedAt: {
    name: 'deleted_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions,
};

interface BaseEntity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { baseSchema, BaseEntity };
