import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import MovieRent from '../../../../database/entities/movie-rent.entity';
import { MovieRentService } from './movie-rent.service';

describe('MovieRentService', () => {
  let service: MovieRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRentService,
        {
          provide: getRepositoryToken(MovieRent),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MovieRentService>(MovieRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
