import { getManager, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import MovieRent from '../../database/entities/movie-rent.entity';
import Movie from '../../database/entities/movie.entity';
import { RentMovieDto } from './dto/rent-movie.dto';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    @InjectRepository(MovieRent)
    private rentRepository: Repository<MovieRent>,
  ) {}

  async findAll(title?: string): Promise<Movie[]> {
    return this.movieRepository.findAll(title);
  }

  async findAvailableMovies(title?: string): Promise<Movie[]> {
    return this.movieRepository.findAvailableMovies(title);
  }

  async rentMovie(
    userId: number,
    movieId: number,
    data: RentMovieDto,
  ): Promise<MovieRent> {
    const movie = await this.movieRepository.findAvailableMovieById(movieId);
    if (!movie)
      throw new NotFoundException('Filme não encontrado ou não disponível');
    return getManager().transaction(async (transactionalEntityManager) => {
      const [movieCopy] = movie.copies;
      const movieRent = this.rentRepository.create({
        user: { id: userId },
        movieCopy: { id: movieCopy.id },
        rentDate: new Date(),
        returnDate: new Date(data.returnDate),
        dateReturned: null,
      });
      await transactionalEntityManager.save(movieRent);
      movieCopy.available = false;
      await transactionalEntityManager.save(movieCopy);

      return movieRent;
    });
  }
}
