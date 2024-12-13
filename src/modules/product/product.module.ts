import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductCategory, ProductImage } from './entities';
import { Category } from 'src/modules/category/entities';
import { CategoryModule } from '../category/category.module';
import { ProductCategoryService } from './product-category.service';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      ProductCategory,
      ProductImage,
    ]),

    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductCategoryService, ProductImageService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
