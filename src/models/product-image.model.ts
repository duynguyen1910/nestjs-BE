import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.model';

@Entity("productImages")
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    productImageId: number;

    @Column({ length: 255 })
    imageUrl: string;

    @ManyToOne(() => Product, (product) => product.images)
    product: Product;
}
