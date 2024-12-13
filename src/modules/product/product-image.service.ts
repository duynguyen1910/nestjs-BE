import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';

export class ProductImageService extends BaseService<
  ProductImage,
  Repository<ProductImage>
> {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {
    super(productImageRepository);
  }

  saveImages(images: ProductImage[]) {
    if (!images.length) return;
    return this._save(images);
  }
}
