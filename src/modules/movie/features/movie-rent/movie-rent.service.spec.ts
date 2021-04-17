import { Test, TestingModule } from '@nestjs/testing';
import { MovieRentService } from './movie-rent.service';

describe('MovieRentService', () => {
  let service: MovieRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRentService],
    }).compile();

    service = module.get<MovieRentService>(MovieRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
