import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MovieCopy from './movie-copy.entity';
import Movie from './movie.entity';
import User from './user.entity';

@Entity({ name: 'movie_rent' })
class MovieRent {
  @PrimaryGeneratedColumn()
  public id?: number;

  @CreateDateColumn()
  rentDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ type: 'date' })
  dateReturned: Date;

  @ManyToOne(() => MovieCopy, (movieCP) => movieCP.rents)
  movieCopy: MovieCopy;

  @ManyToOne(() => User, (user) => user.rents)
  user: User;
}

export default MovieRent;
