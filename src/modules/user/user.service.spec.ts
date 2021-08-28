import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRespository } from './user.repository';
import { UserService } from './user.service';

const userMockValue = {
  id: 1,
  name: 'Some name',
  email: 'mail@mail.com',
  password: '123456',
};

describe('UserService', () => {
  let service: UserService;
  let repo: UserRespository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRespository,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(userMockValue),
            save: jest.fn().mockResolvedValue(userMockValue),
            create: jest.fn().mockResolvedValue(userMockValue),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<UserRespository>(UserRespository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindByEmail', () => {
    it('Should find one user by email', async () => {
      const repoSpy = jest.spyOn(repo, 'findByEmail');
      await expect(service.findByEmail('mail@mail.com')).resolves.toEqual(
        userMockValue,
      );
      expect(repoSpy).toBeCalledTimes(1);
    });

    it('Should throw not found if user does not exist', async () => {
      const repoSpy = jest.spyOn(repo, 'findByEmail').mockResolvedValue(null);
      await expect(service.findByEmail('mail2@mail.com')).rejects.toThrowError(
        NotFoundException,
      );
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('SignUp', () => {
    it('Should create a user with success', async () => {
      const findEmailSpy = jest
        .spyOn(repo, 'findByEmail')
        .mockResolvedValue(null);
      const repoSpy = jest.spyOn(repo, 'save');
      await expect(service.signUp(userMockValue)).resolves.toEqual(
        userMockValue,
      );
      expect(findEmailSpy).toBeCalledTimes(1);
      expect(repoSpy).toBeCalledTimes(1);
    });

    it('Should throw conflict exception when email already exist', async () => {
      const findEmailSpy = jest.spyOn(repo, 'findByEmail');
      await expect(service.signUp(userMockValue)).rejects.toThrowError(
        ConflictException,
      );
      expect(findEmailSpy).toBeCalledTimes(1);
    });
  });
});
