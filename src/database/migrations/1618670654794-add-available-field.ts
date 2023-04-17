import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvailableField1618670654794 implements MigrationInterface {
  name = 'addAvailableField1618670654794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_copy" ADD "available" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie_copy" DROP COLUMN "available"`);
  }
}
