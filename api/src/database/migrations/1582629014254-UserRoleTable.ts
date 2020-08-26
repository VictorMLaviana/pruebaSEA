import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleTable1582629014254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE user_role (
            user_id uuid NOT NULL,
            role_id uuid NOT NULL
        );
        ALTER TABLE user_role OWNER TO "${process.env.POSTGRES_USER}";
        ALTER TABLE user_role
            ADD CONSTRAINT fk_user_role_role_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;
        ALTER TABLE user_role
            ADD CONSTRAINT fk_user_role_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_role', true);
  }
}
