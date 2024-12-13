import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JWT_EXPIRES } from 'src/common/constants';
import { convertToSeconds } from 'src/common/utils';
import { RefreshTokenService } from '../user/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneUser(username);

    if (!user || !user.username || !user.password) {
      throw new BadRequestException('Invalid username or password');
    }

    if (await bcrypt.compare(password, user.password)) return user;

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const userValid = await this.validateUser(user.username, user.password);

    if (userValid) {
      const payload: JwtPayload = {
        username: userValid.username,
        role: userValid.role,
        sub: userValid.userId,
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: JWT_EXPIRES.ACCESS_TOKEN,
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: JWT_EXPIRES.REFRESH_TOKEN,
      });

      const refreshTokenTTL = convertToSeconds(JWT_EXPIRES.REFRESH_TOKEN);

      this.refreshTokenService.saveRefreshToken(
        userValid.userId,
        refreshToken,
        refreshTokenTTL,
      );

      const loginInfo = {
        accessToken,
        refreshToken,
        user: userValid,
      };

      const userDto = plainToInstance(LoginResponseDto, loginInfo, {
        excludeExtraneousValues: true,
      });

      return userDto;
    }

    throw new BadRequestException('Invalid Credentials!');
  }

  async register(createUserDto: UserDto): Promise<UserResponseDto> {
    const existingUser = await this.userService.findOneUser(
      createUserDto.username,
    );
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const userDto = plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const tokenValid = await this.refreshTokenService.validateRefreshToken(
        payload.sub,
        refreshToken,
      );
      if (!tokenValid) {
        throw new UnauthorizedException('Invalid token. Please try again.');
      }

      const newPayload = {
        sub: payload.sub,
        role: payload.role,
        username: payload.username,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: JWT_EXPIRES.ACCESS_TOKEN,
      });

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'Refresh token has expired. Please login again.',
        );
      }

      throw new UnauthorizedException(error);
    }
  }
}
