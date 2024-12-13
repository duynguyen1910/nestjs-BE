import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/common/base.service';
import { Product, ProductCategory, ProductImage } from './entities';
import { CreateProductDto, ProductResponseDto } from './dto';
import { CategoryService } from '../category/category.service';
import { ProductCategoryService } from './product-category.service';
import { ProductImageService } from './product-image.service';

@Injectable()
export class ProductService extends BaseService<Product, Repository<Product>> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly categoryService: CategoryService,

    private readonly productCategoryService: ProductCategoryService,

    private readonly productImageService: ProductImageService,
  ) {
    super(productRepository);
  }

  async getAllProduct(): Promise<ProductResponseDto[]> {
    const products = await this._find({
      relations: ['categories', 'categories.category', 'images'],
    });
    console.log('products: ', products);

    const responseDtos = products.map((product) =>
      plainToInstance(ProductResponseDto, {
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        description: product.description,
        categories: product.categories,
        images: product.images.map((img) => img.imageUrl),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }),
    );

    return responseDtos;
  }

  async getProductById(productId: string): Promise<ProductResponseDto> {
    const product = await this._findOne({
      where: { productId },
      relations: ['categories', 'categories.category', 'images'],
    });

    if (!product) throw new BadRequestException('product not found');

    const responseDto = plainToInstance(ProductResponseDto, {
      ...product,
      categories: product.categories.map(({ category }) => category),
      images: product.images.map(({ imageUrl }) => imageUrl),
    });

    return responseDto;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const { categoryIds, images, ...newProduct } = createProductDto;

    if (!categoryIds || !categoryIds.length) {
      throw new BadRequestException('categoryIds not found');
    }

    if (!images || !images.length) {
      throw new BadRequestException('images not found');
    }

    const product = await this._create(newProduct);
    const categories =
      await this.categoryService.getCategoriesByIds(categoryIds);

    if (!categories || !categories?.length) {
      throw new BadRequestException('categoryIds not found');
    }

    const productCategories = categories.map((category) => {
      const productCategory = new ProductCategory();
      productCategory.product = product;
      productCategory.category = category;
      return productCategory;
    });

    const productImages = images.map((imageUrl) => {
      const productImage = new ProductImage();
      productImage.imageUrl = imageUrl;
      productImage.product = product;
      return productImage;
    });

    await this._save(product);
    await this.productCategoryService.saveProductCategories(productCategories);
    await this.productImageService.saveImages(productImages);

    const responseDto = plainToInstance(ProductResponseDto, {
      ...product,
      categories,
      images,
    });

    return responseDto;
  }

  async getProductByCategoryId(
    categoryId: string,
  ): Promise<ProductResponseDto[]> {
    if (!categoryId || !categoryId.trim()) {
      throw new BadRequestException(
        'categoryId is required and cannot be empty',
      );
    }

    const products = await this._find({
      where: {
        categories: {
          category: {
            categoryId,
          },
        },
      },
      relations: ['categories', 'categories.category', 'images'],
    });

    const responseDtos = products.map((product) => {
      const responseDto = plainToInstance(ProductResponseDto, {
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        description: product.description,
        categories: product.categories,
        images: product.images.map((img) => img.imageUrl),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
      return responseDto;
    });

    return responseDtos;
  }

  // async updateProduct(productId: string): Promise<Product> {
  //   const product = await this._findOne({
  //     where: { productId: productId },
  //   });
  //   if (product) {
  //     Object.assign(product, productDto);
  //     return this._save(product);
  //   }
  //   return null;
  // }

  // async deleteProduct(productId: string): Promise<void> {
  //   const product = await this._findOne({
  //     where: { productId: productId },
  //   });
  //   if (product) {
  //     // await this.productRepository.remove(product);
  //   }
  // }
}
