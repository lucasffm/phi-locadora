import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

import * as bcrypt from 'bcrypt';
import MovieRent from './movie-rent.entity';

@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  public email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @OneToMany(() => MovieRent, (movieRent) => movieRent.user)
  rents: MovieRent[];
}

export default User;
