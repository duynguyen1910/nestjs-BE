import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { RefreshToken } from './entities';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

export class RefreshTokenService extends BaseService<
  RefreshToken,
  Repository<RefreshToken>
> {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,

    private readonly userSerivce: UserService,
  ) {
    super(refreshTokenRepository);
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
    ttl: number,
  ): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + ttl);

    const user = await this.userSerivce.getUserInfo(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tokenEntity = await this._create({
      token: refreshToken,
      expiresAt,
      user,
    });

    await this._save(tokenEntity);
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const tokenEntity = await this.refreshTokenRepository.findOne({
        where: {
          token: refreshToken,
          user: { userId },
        },
      });

      if (!tokenEntity) {
        return false;
      }

      const now = new Date();
      if (tokenEntity.expiresAt < now) {
        return false;
      }

      return true;
    } catch (error) {
      console.log('error:', error);
      throw new BadRequestException(error);
    }
  }
}
