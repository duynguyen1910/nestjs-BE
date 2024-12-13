import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base.entity';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column()
  categoryName: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  @Expose()
  products: ProductCategory[];

  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }
}
