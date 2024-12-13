import { IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  isActive?: boolean;
}
