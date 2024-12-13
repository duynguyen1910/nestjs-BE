import { BaseEntity } from 'src/common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refreshTokens')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  refreshTokenId: string;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
