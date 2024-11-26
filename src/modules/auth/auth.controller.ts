import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body); 
  }

  @UseGuards(AuthGuard)
  @Post('protected')
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected route!', user: req.user };
  }
}
