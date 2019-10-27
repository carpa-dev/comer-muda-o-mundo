import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<any> {
    this.password = await hash(this.password);
  }

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

export function hash(password): Promise<string> {
  return bcrypt.hash(password, 10);
}
