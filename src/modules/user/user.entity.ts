import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'usuario' })
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @Column({
    type: 'varchar',
    unique: true,
    name: 'email',
    nullable: false,
    length: 100,
  })
  public email: string;

  @Column({ type: 'varchar', name: 'name', nullable: false, length: 255 })
  public password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

export default User;
