import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/models/user.model';
import { UserDto } from 'src/modules/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (!user || !user.password) {
      throw new BadRequestException('Invalid username or password');
    }

    if (await bcrypt.compare(password, user.password)) return user;

    return null;
  }

  async login(user: User) {
    const userValid = await this.validateUser(user.username, user.password);

    if (userValid) {
      const payload = {
        username: userValid.username,
        sub: userValid.userId,
      };

      return {
        accessToken: this.jwtService.sign(payload),
        user: {
          username: userValid.username,
          fullname: userValid.fullname,
          isActive: userValid.isActive,
        },
      };
    }

    throw new BadRequestException('Invalid Credentials!');
  }

  async register(createUserDto: UserDto): Promise<User> {
    const existingUser = await this.userService.findOne(createUserDto.username);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...result } = newUser;
    return result;
  }
}
