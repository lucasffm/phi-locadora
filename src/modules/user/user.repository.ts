import { EntityRepository, Repository } from 'typeorm';
import User from '../../database/entities/user.entity';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
