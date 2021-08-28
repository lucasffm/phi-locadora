import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import MovieRent from '../../../../database/entities/movie-rent.entity';

import { MovieRentController } from './movie-rent.controller';
import { MovieRentService } from './movie-rent.service';

describe('MovieRentController', () => {
  let controller: MovieRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieRentController],
      providers: [
        MovieRentService,
        {
          provide: getRepositoryToken(MovieRent),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MovieRentController>(MovieRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
