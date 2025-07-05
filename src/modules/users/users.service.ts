import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';

// export type User = {
//   userId: number;
//   username: string;
//   email: string;
//   password: string;
//   createdAt: Date;
// };

const mockUsers: User[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: '1234',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    username: 'jane_doe',
    email: 'jane@example.com',
    password: '5678',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    username: 'alice_smith',
    email: 'alice@example.com',
    password: 'hashed_password',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserByEmail(email: string): User | null {
    try {
      const user = mockUsers.find((user) => user.email === email) ?? null;
      return user;
    } catch (error) {
      console.error('Error finding user by email', error);
      return null;
    }
  }

  findUserByName(username: string): User | null {
    try {
      const user = mockUsers.find((user) => user.username === username) ?? null;
      return user;
    } catch (error) {
      console.error('Error finding user by username', error);
      return null;
    }
  }
}
