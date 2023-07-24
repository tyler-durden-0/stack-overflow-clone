import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUserEntity: User = this.usersRepository.create({
      ...user,
    });

    await this.usersRepository.save(user);

    return newUserEntity;
  }
}
