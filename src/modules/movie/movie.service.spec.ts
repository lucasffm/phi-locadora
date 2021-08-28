import { addDays } from 'date-fns';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import MovieRent from '../../database/entities/movie-rent.entity';
import { MovieRepository } from './movie.repository';
import { MovieService } from './movie.service';
import { MockSandbox } from '../../common/mocks/MockSandBox';
import { createStubInstance } from 'sinon';
import { EntityManager, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const movieListMock = [
  {
    id: 1,
    title: 'Batman: O Cavaleiro das Trevas',
    director: 'Christopher Nolan',
    createdAt: '2021-04-17T14:33:11.894Z',
    updatedAt: '2021-04-17T14:33:11.894Z',
  },
  {
    id: 2,
    title: 'Batman vs Superman: A Origem da Justiça',
    director: 'Zack Snyder',
    createdAt: '2021-04-17T14:33:11.898Z',
    updatedAt: '2021-04-17T14:33:11.898Z',
  },
];

const moviesAvailableMock = [
  {
    id: 1,
    title: 'Batman: O Cavaleiro das Trevas',
    director: 'Christopher Nolan',
    createdAt: '2021-04-17T14:33:11.894Z',
    updatedAt: '2021-04-17T14:33:11.894Z',
    copies: [
      {
        id: 1,
        available: true,
        createdAt: '2021-04-17T14:45:04.093Z',
        updatedAt: '2021-04-17T14:45:04.093Z',
      },
    ],
  },
  {
    id: 2,
    title: 'Batman vs Superman: A Origem da Justiça',
    director: 'Zack Snyder',
    createdAt: '2021-04-17T14:33:11.898Z',
    updatedAt: '2021-04-17T14:33:11.898Z',
    copies: [
      {
        id: 5,
        available: true,
        createdAt: '2021-04-17T14:45:18.404Z',
        updatedAt: '2021-04-17T14:45:18.404Z',
      },
    ],
  },
];

describe('MovieService', () => {
  let service: MovieService;
  let repo: MovieRepository;
  let rentRepo: Repository<MovieRent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: MovieRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(movieListMock),
            findAvailableMovies: jest
              .fn()
              .mockResolvedValue(moviesAvailableMock),
            findAvailableMovieById: jest
              .fn()
              .mockResolvedValue(moviesAvailableMock[0]),
          },
        },
        {
          provide: getRepositoryToken(MovieRent),
          useValue: {
            create: jest.fn().mockResolvedValue({
              user: { id: 1 },
              movieCopy: { id: 1 },
              rentDate: new Date(),
              returnDate: addDays(new Date(), 7),
              dateReturned: null,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repo = module.get<MovieRepository>(MovieRepository);
    rentRepo = module.get<Repository<MovieRent>>(getRepositoryToken(MovieRent));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindAll', () => {
    it('should an array of movies', async () => {
      expect(await service.findAll()).toBe(movieListMock);
    });
  });

  describe('Find Available movies', () => {
    it('should return an array of available movies', async () => {
      expect(await service.findAvailableMovies()).toBe(moviesAvailableMock);
    });
  });

  describe('Rent Movie', () => {
    let mockSandbox: MockSandbox;
    afterEach(() => mockSandbox?.close());

    // it('should rent a movie with success', async () => {
    //   const newRent = {
    //     rentDate: '2021-04-17T15:42:10.680Z',
    //     returnDate: '2021-02-15T00:00:00.000Z',
    //     dateReturned: null,
    //     movieCopy: {
    //       id: 1,
    //     },
    //     user: {
    //       id: 1,
    //     },
    //     id: 7,
    //   };
    //   const fakeManager = createStubInstance(EntityManager);
    //   fakeManager.transaction.resolves(newRent);

    //   mockSandbox = new MockSandbox('getManager', fakeManager);
    //   expect(
    //     await service.rentMovie(1, 1, { returnDate: addDays(new Date(), 7) }),
    //   ).toEqual(newRent);
    // });

    it('should throw an error if movie not exist or is not available', async () => {
      const spy = jest
        .spyOn(repo, 'findAvailableMovieById')
        .mockResolvedValue(null);
      await expect(
        service.rentMovie(1, 25, { returnDate: addDays(new Date(), 7) }),
      ).rejects.toThrow(NotFoundException);
      expect(spy).toHaveBeenCalledWith(25);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
