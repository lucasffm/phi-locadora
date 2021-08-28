import { EntityRepository, Repository } from 'typeorm';
import Movie from '../../database/entities/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  findAll(title?: string): Promise<Movie[]> {
    let qb = this.createQueryBuilder('movie');

    if (!!title) {
      qb.where('title ILIKE :title', { title: `%${title}%` });
    }

    return qb.getMany();
  }

  findAvailableMovies(title?: string): Promise<Movie[]> {
    let qb = this.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.copies', 'movieCopy')
      .where('movieCopy.available = true');

    if (!!title) {
      qb.andWhere('title ILIKE :title', { title: `%${title}%` });
    }

    return qb.getMany();
  }

  findAvailableMovieById(id?: number): Promise<Movie> {
    let qb = this.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.copies', 'movieCopy')
      .where('movie.id = :id', { id })
      .andWhere('movieCopy.available = true');

    return qb.getOne();
  }
}
