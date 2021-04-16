import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MovieRent from './movie-rent.entity';
import Movie from './movie.entity';

@Entity({ name: 'movie_copy' })
class MovieCopy {
  @PrimaryGeneratedColumn()
  public id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.copies)
  movie: Movie;

  @OneToMany(() => MovieRent, (movieRent) => movieRent.movieCopy)
  rents: MovieRent[];
}

export default MovieCopy;
