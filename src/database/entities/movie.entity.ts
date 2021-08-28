import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MovieCopy from './movie-copy.entity';

@Entity({ name: 'movie' })
class Movie {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  public director: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MovieCopy, (movieCopy) => movieCopy.movie)
  copies: MovieCopy[];
}

export default Movie;
