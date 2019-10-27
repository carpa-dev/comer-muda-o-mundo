import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const samePassword = await bcrypt.compare(pass, user.password);

      if (samePassword) {
        const { password, ...result } = user;

        return result;
      }
    }

    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id, active: user.isActive };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async activate(userId: number, password: string): Promise<any> {
    const user = await this.userRepository.findOneOrFail(userId);

    user.password = password;
    user.isActive = true;
    const saved = await this.userRepository.save(user);

    return this.login(user);
  }
}
