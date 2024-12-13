import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  controllers: [UserController],
  providers: [UserService, RefreshTokenService, JwtService],
  exports: [UserService, RefreshTokenService, TypeOrmModule],
})
export class UserModule {}
