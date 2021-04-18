import { Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MovieRentService } from './movie-rent.service';

@ApiBearerAuth()
@ApiTags('Movie Rent')
@Controller('movie-rent')
export class MovieRentController {
  constructor(private movieRentService: MovieRentService) {}

  @Put(':id/give-back')
  giveBackMovie(@Param('id') id: number) {
    return this.movieRentService.giveBackMovie(id);
  }
}
