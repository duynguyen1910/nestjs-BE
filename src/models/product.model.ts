import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  categoryId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
