import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      email: 'lucas@mail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@mail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
