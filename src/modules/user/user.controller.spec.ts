import { Test, TestingModule } from '@nestjs/testing';
import User from '../../database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userMockValue = {
  id: 1,
  name: 'Some name',
  email: 'mail@mail.com',
  password: '123456',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            signUp: jest
              .fn()
              .mockImplementation((user: User) => Promise.resolve(user)),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Signup', () => {
    it('should create a user with success', async () => {
      const spy = jest.spyOn(service, 'signUp');
      const expectedValue = { ...userMockValue };
      delete expectedValue.password;
      const response = await controller.signUp(userMockValue);
      expect(response.data).toEqual(expectedValue);
      expect(response.message).toBe('Usuário criado com sucesso');
      expect(spy).toHaveBeenCalledWith(userMockValue);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
