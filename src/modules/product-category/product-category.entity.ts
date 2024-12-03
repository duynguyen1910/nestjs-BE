import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Entity('productCategories')
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    productCategoryId: string;

    @ManyToOne(() => Product, (product) => product.categories)
    product: Product;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}

