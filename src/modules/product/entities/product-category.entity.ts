import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../../category/entities/category.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity('productCategories')
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  productCategoryId: string;

  @ManyToOne(() => Product, (product) => product.categories)
  product: Product;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
