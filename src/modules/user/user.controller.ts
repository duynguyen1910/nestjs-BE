import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, RoleGuard } from '../../guards';
import { Roles } from 'src/decorators';
import { Role } from 'src/enums';
import { UserResponseDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.CUSTOMER)
  getAllUser(): Promise<UserResponseDto[]> {
    return this.userService.getAllUser();
  }

  @Get('info')
  @UseGuards(AuthGuard)
  getUserInfo(@Req() req): Promise<UserResponseDto> {
    const userId = req.user.sub;
    return this.userService.getUserInfo(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
