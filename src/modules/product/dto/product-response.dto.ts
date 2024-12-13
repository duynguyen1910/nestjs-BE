import { Expose } from 'class-transformer';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import { BaseEntity } from 'src/common/base.entity';

export class ProductResponseDto extends BaseEntity {
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
}
