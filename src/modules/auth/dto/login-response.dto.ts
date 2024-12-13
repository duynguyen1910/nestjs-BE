import { Expose } from 'class-transformer';
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/entities/user.entity';

export class LoginResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  user: User;
}
