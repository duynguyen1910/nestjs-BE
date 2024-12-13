import { Role } from 'src/enums';

export interface JwtPayload {
  username: string;
  role: Role;
  sub: string;
}
