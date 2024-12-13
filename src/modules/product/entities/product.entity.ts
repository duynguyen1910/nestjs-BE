import { Exclude, Expose } from 'class-transformer';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity('products')
export class Product extends BaseEntity {
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

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  @Expose()
  categories: ProductCategory[];

  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }
}
