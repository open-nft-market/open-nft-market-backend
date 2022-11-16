import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(public usersRepository: UsersRepository) {}

  saveNewUser(data: Partial<User>): Promise<User> {
    return this.usersRepository.save({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByAddress(walletAddress: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        walletAddress,
      },
    });
  }

  updateById(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }

  increment({ id, column, by = 1 }: { id: number; column: keyof User; by?: number }): Promise<UpdateResult> {
    return this.usersRepository.increment({ id }, column, by);
  }

  decrement({ id, column, by = 1 }: { id: number; column: keyof User; by?: number }): Promise<UpdateResult> {
    return this.usersRepository.decrement({ id }, column, by);
  }
}
