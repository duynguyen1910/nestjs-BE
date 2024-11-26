import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column()
  categoryName: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;


  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
