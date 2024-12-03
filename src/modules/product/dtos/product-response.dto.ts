import { Expose } from 'class-transformer';
import { ProductCategory } from 'src/modules/product-category/product-category.entity';

export class ProductResponseDto {
    @Expose()
    productId: string;

    @Expose()
    productName: string;

    @Expose()
    price: number;

    @Expose()
    description?: string;

    @Expose()
    categories: ProductCategory[];  

    @Expose()
    images: string[];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
