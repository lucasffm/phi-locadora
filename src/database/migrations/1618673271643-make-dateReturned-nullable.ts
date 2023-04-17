import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeDateReturnedNullable1618673271643
  implements MigrationInterface
{
  name = 'makeDateReturnedNullable1618673271643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_rent" ALTER COLUMN "date_returned" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_rent" ALTER COLUMN "date_returned" SET NOT NULL`,
    );
  }
}
