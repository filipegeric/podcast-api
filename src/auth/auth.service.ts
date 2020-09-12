import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    if ((await this.userRepository.count({ where: { username } })) > 0) {
      throw new ConflictException('Username is taken');
    }

    const user = new User();
    user.username = username;
    user.password = await hash(password);

    await this.userRepository.save(user);
  }

  async login(loginDto: RegisterDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await verify(user.password, password))) {
      throw new UnauthorizedException('Bad credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const secret = process.env.JWT_SECRET || 'supersecret';
    const token = sign({ user }, secret, { expiresIn: '30d' });
    return { token };
  }
}
