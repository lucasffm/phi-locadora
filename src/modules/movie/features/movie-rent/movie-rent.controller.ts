import { Controller, Param, Put } from '@nestjs/common';
import { MovieRentService } from './movie-rent.service';

@Controller('movie-rent')
export class MovieRentController {
  constructor(private movieRentService: MovieRentService) {}

  @Put(':id/give-back')
  giveBackMovie(@Param('id') id: number) {
    return this.movieRentService.giveBackMovie(id);
  }
}
