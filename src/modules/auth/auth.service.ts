import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entities/User.entity';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';
import { hashPassword } from 'src/utils/hashPassword';
import { comparePassword } from 'src/utils/comparePassword';
import { UsersService } from '../users/users.service';

export type AuthInput = {
  email: string;
  password: string;
};

type LoginData = {
  userId: number;
  username: string;
};

type AuthResult = {
  accessToken: string;
  refreshToken: string;
  userId: number | string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult | null> {
    try {
      const user = await this.validateUser(input);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: AuthResult = {
        accessToken: 'fakeAccessToken', // Replace with actual token generation logic
        refreshToken: 'fakeRefreshToken', // Replace with actual token generation logic
        userId: user.userId,
      };

      return payload;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return null;
    }
  }

  async validateUser(input: AuthInput): Promise<LoginData | null> {
    try {
      const { email, password } = input;
      const user = this.userService.findUserByEmail(email);

      if (!user) {
        return null;
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      return {
        userId: user.id,
        username: user.username,
      };
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async createUser(body: UserRegisterDto) {
    const { email, name, password } = body;

    try {
      // check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      console.log('Check hashedPassword:', hashedPassword);

      const user = this.userRepository.create({
        email,
        username: name,
        password: hashedPassword,
      });

      return this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  // [POST] /auth/login
  async login(user: UserLoginDto) {
    try {
      const { email, password } = user;
      const existingUser = await this.userRepository.findOneBy({ email });

      if (!existingUser) {
        return new UnauthorizedException('Email is not exist');
      }

      const isCorrectPassword = await comparePassword(
        password,
        existingUser.password,
      );

      if (!isCorrectPassword) {
        return new UnauthorizedException('Password is not correct');
      }

      // create accessToken
      const payload = {
        email: existingUser.email,
        sub: existingUser.id,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error(error);
    }
  }
}
