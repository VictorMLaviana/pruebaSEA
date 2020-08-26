import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTable1582628860218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE users (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        first_name text NOT NULL,
        last_name text,
        email text NOT NULL,
        created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp without time zone
      );
      ALTER TABLE users OWNER TO "${process.env.POSTGRES_USER}";
      ALTER TABLE users ADD CONSTRAINT unique_users_email UNIQUE (email);
      ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users', true);
  }
}
