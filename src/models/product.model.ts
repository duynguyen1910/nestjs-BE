import { Exclude, Expose } from 'class-transformer';
import { ProductCategory } from 'src/modules/product-category/product-category.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductImage } from './product-image.model';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ nullable: false })
  @Column()
  productName: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
  @Expose()
  categories: ProductCategory[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
