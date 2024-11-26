import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['userId', 'username', 'fullname', 'isActive', 'password'],
    });

    return user;

    // return this.usersRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.username || !user.password || !user.fullname) {
      throw new BadRequestException('Username, password and fullname are required!');
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserInfo(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }
}
