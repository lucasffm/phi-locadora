import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieRent from '../../database/entities/movie-rent.entity';
import { MovieController } from './movie.controller';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';
import { MovieRentController } from './features/movie-rent/movie-rent.controller';
import { MovieRentService } from './features/movie-rent/movie-rent.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRent, MovieRepository])],
  controllers: [MovieController, MovieRentController],
  providers: [MovieService, MovieRentService],
})
export class MovieModule {}
