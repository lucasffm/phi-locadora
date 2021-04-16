import {MigrationInterface, QueryRunner} from "typeorm";

export class structure1618613110300 implements MigrationInterface {
    name = 'structure1618613110300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_rent" ("id" SERIAL NOT NULL, "rent_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" date NOT NULL, "date_returned" date NOT NULL, "movie_copy_id" integer, "user_id" integer, CONSTRAINT "PK_0d97199759e16ecf213674ddbb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "director" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_copy" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "movie_id" integer, CONSTRAINT "PK_089644943b5c9c254482ff18a81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_rent" ADD CONSTRAINT "FK_2df21857a962279b2eac4af05c1" FOREIGN KEY ("movie_copy_id") REFERENCES "movie_copy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_rent" ADD CONSTRAINT "FK_2c8c16c82282e9a2d93ba1d1a17" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_copy" ADD CONSTRAINT "FK_8ef3b5474e7f324c5ada16e93a7" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_copy" DROP CONSTRAINT "FK_8ef3b5474e7f324c5ada16e93a7"`);
        await queryRunner.query(`ALTER TABLE "movie_rent" DROP CONSTRAINT "FK_2c8c16c82282e9a2d93ba1d1a17"`);
        await queryRunner.query(`ALTER TABLE "movie_rent" DROP CONSTRAINT "FK_2df21857a962279b2eac4af05c1"`);
        await queryRunner.query(`DROP TABLE "movie_copy"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "movie_rent"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
