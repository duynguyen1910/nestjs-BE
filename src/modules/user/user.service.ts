import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class UserService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this._findOne({
      where: { username },
      // select: ['userId', 'username', 'fullname', 'isActive', 'password'],
    });

    return user;

    // return this._findOne({ where: { username } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    if (!user.username || !user.password || !user.fullname) {
      throw new BadRequestException(
        'Username, password and fullname are required!',
      );
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUser(): Promise<UserResponseDto[]> {
    const users = await this._find();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async getUserInfo(userId: string): Promise<UserResponseDto> {
    const currentUser = this._findOne({ where: { userId } });

    return plainToInstance(UserResponseDto, currentUser, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    userId: string,
    userInfo: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return;
  }
}
