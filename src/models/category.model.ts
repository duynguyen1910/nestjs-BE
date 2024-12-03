import { Exclude, Expose } from 'class-transformer';
import { ProductCategory } from 'src/modules/product-category/product-category.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column()
  categoryName: string;

  @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
  @Expose()
  products: ProductCategory[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
