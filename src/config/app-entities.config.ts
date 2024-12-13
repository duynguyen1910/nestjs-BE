import { Category } from 'src/modules/category/entities';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import { ProductImage } from 'src/modules/product/entities/product-image.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { RefreshToken } from 'src/modules/user/entities/refresh-token.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const AppEntities = [
  Product,
  Category,
  User,
  ProductCategory,
  ProductImage,
  RefreshToken,
];
