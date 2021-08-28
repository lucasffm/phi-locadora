import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import MovieRent from '../../../../database/entities/movie-rent.entity';

@Injectable()
export class MovieRentService {
  constructor(
    @InjectRepository(MovieRent)
    private movieRentRepository: Repository<MovieRent>,
  ) {}

  async giveBackMovie(id: number) {
    const movieRent = await this.movieRentRepository.findOne(
      { id, dateReturned: null },
      {
        relations: ['movieCopy'],
      },
    );
    if (!movieRent) throw new NotFoundException('Locação não encontrada.');
    movieRent.dateReturned = new Date();
    const { movieCopy } = movieRent;
    movieCopy.available = true;
    return getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(movieRent);
      await transactionalEntityManager.save(movieCopy);
      return movieRent;
    });
  }
}
