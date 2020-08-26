import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolesTable1582628979346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE roles (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name text NOT NULL,
                description text,
                created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted_at timestamp without time zone
            );
            ALTER TABLE roles OWNER TO "${process.env.POSTGRES_USER}";
            ALTER TABLE roles ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
            ALTER TABLE roles ADD CONSTRAINT unique_roles_name UNIQUE (name);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('roles', true);
  }
}
