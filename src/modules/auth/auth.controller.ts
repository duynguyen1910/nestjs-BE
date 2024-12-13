import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LoginResponseDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post('protected')
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected route!', user: req.user };
  }
}
