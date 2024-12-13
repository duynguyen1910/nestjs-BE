import { Exclude, Expose } from 'class-transformer';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Exclude()
  @Column({ nullable: true })
  createdBy?: string;

  @Exclude()
  @Column({ nullable: true })
  updatedBy?: string;
}
