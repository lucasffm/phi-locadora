import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import User from '../../database/entities/user.entity';
import { SignUpUserDto } from './dto/signUp.dto';
import { UserRespository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRespository: UserRespository) {}

  async findByEmail(email: string): Promise<any | undefined> {
    const user = await this.userRespository.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async signUp(data: SignUpUserDto): Promise<User> {
    const userExist = await this.userRespository.findByEmail(data.email);
    if (userExist)
      throw new ConflictException(
        'Já existe um usuário cadastrado com este email.',
      );
    return this.userRespository.save(this.userRespository.create(data));
  }
}
