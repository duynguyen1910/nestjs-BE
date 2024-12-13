import { BaseService } from 'src/common/base.service';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductCategoryService extends BaseService<
  ProductCategory,
  Repository<ProductCategory>
> {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {
    super(productCategoryRepository);
  }

  saveProductCategories(productCategories: ProductCategory[]) {
    if (!productCategories.length) return;
    return this._save(productCategories);
  }
}
