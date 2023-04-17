import { MigrationInterface, QueryRunner } from 'typeorm';

export class fakeData1618769337008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public."user"
        (id, name, email, "password", created_at, updated_at)
        VALUES(1, 'Some Name', 'mail@mail.com', '$2b$10$txzWn27K6L41lfdj5TcdGeFCKr6oX8XSSxjWx.TUCpYorwTVBwLMK', '2021-04-16 19:49:44.925', '2021-04-16 19:49:44.925');
        `);
    await queryRunner.query(`INSERT INTO public.movie
        (id, title, director, created_at, updated_at)
        VALUES(1, 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', '2021-04-17 11:33:11.894', '2021-04-17 11:33:11.894');
        INSERT INTO public.movie
        (id, title, director, created_at, updated_at)
        VALUES(2, 'Batman vs Superman: A Origem da Justiça', 'Zack Snyder', '2021-04-17 11:33:11.898', '2021-04-17 11:33:11.898');
        `);
    await queryRunner.query(`INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(2, '2021-04-17 11:45:04.103', '2021-04-17 11:45:04.103', 1, true);
            INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(6, '2021-04-17 11:45:18.405', '2021-04-17 11:45:18.405', 2, true);
            INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(4, '2021-04-17 11:45:18.395', '2021-04-17 11:45:18.395', 2, true);
            INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(5, '2021-04-17 11:45:18.404', '2021-04-17 11:45:18.404', 2, true);
            INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(3, '2021-04-17 11:45:04.104', '2021-04-17 15:40:34.974', 1, true);
            INSERT INTO public.movie_copy
            (id, created_at, updated_at, movie_id, available)
            VALUES(1, '2021-04-17 11:45:04.093', '2021-04-17 15:42:26.605', 1, true);
        `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
