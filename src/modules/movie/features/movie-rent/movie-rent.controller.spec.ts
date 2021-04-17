import { Test, TestingModule } from '@nestjs/testing';
import { MovieRentController } from './movie-rent.controller';

describe('MovieRentController', () => {
  let controller: MovieRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieRentController],
    }).compile();

    controller = module.get<MovieRentController>(MovieRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
