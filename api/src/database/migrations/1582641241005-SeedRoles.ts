import { MigrationInterface, QueryRunner } from 'typeorm';

import SeederRoles from '../seeders/1582642805935-roles';
import { getRepositories } from '../../repositories';

export class SeedRoles1582641241005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.commitTransaction();
    await queryRunner.startTransaction();
    await getRepositories().rolesRepository.save(SeederRoles);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('TRUNCATE TABLE "roles" CASCADE');
  }
}
