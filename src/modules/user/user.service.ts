import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRespository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRespository: UserRespository) {}
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

  async findByEmail(email: string): Promise<any | undefined> {
    const user = await this.userRespository.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }
}
