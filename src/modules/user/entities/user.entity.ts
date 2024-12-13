import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { Role } from 'src/enums';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Entity('users')
export class User extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Expose()
  @Column({ unique: true, nullable: false })
  username: string;

  @Expose()
  @Column({ nullable: false })
  fullname: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Expose()
  @Column({ default: true })
  isActive: boolean;

  // @Column('simple-array', { default: [] })
  // permissions: Permission[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
