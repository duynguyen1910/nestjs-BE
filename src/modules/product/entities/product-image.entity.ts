import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity('productImages')
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  productImageId: number;

  @Column({ length: 255 })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
