import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import MovieCopy from './movie-copy.entity';
import User from './user.entity';

@Entity({ name: 'movie_rent' })
class MovieRent {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  rentDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ type: 'date', nullable: true })
  dateReturned: Date;

  @ManyToOne(() => MovieCopy, (movieCP) => movieCP.rents)
  movieCopy: MovieCopy;

  @ManyToOne(() => User, (user) => user.rents)
  user: User;
}

export default MovieRent;
