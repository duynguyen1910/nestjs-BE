import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Role } from 'src/enums';

export class UserResponseDto extends BaseEntity {
  @Expose()
  userId: string;

  @Expose()
  username: string;

  @Expose()
  fullname: string;

  @Expose()
  role: Role;

  @Expose()
  isActive: boolean;
}
