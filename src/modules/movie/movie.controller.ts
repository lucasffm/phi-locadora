import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import MovieRent from '../../database/entities/movie-rent.entity';
import Movie from '../../database/entities/movie.entity';
import JwtAuthenticationGuard from '../auth/strategies/jwt-authentication.guard';
import { RentMovieDto } from './dto/rent-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
@UseGuards(JwtAuthenticationGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('')
  findAll(@Query('title') title: string): Promise<Movie[]> {
    return this.movieService.findAll(title);
  }

  @Get('available')
  findAvailableMovies(@Query('title') title: string): Promise<Movie[]> {
    return this.movieService.findAvailableMovies(title);
  }

  @Post(':id/rent')
  rentMovie(
    @Req() req: any,
    @Param('id') movieId: number,
    @Body() body: RentMovieDto,
  ): Promise<MovieRent> {
    const userId = req.user.id;
    return this.movieService.rentMovie(userId, movieId, body);
  }
}
