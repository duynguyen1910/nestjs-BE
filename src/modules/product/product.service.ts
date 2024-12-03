import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from 'src/modules/product/dtos/product.dto';
import { Product } from 'src/models/product.model';
import { Category } from 'src/models/category.model';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductCategory } from '../product-category/product-category.entity';
import { ProductImage } from 'src/models/product-image.model';
import { ProductResponseDto } from './dtos/product-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,

        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>
    ) { }

    async getAllProduct(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getProductById(productId: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findOne({
            where: { productId },
            relations: ['categories', 'categories.category', 'images'],
        });

        if (!product) throw new BadRequestException("product not found");

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
    }

    async addProduct(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        const { categoryIds, images, ...newProduct } = createProductDto;

        if (!categoryIds || !categoryIds.length) {
            throw new BadRequestException('categoryIds not found');
        }

        if (!images || !images.length) {
            throw new BadRequestException('images not found');
        }

        const product = this.productRepository.create(newProduct);
        const categories = await this.categoryRepository.findByIds(categoryIds);

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

        await this.productRepository.save(product);
        await this.productCategoryRepository.save(productCategories);
        await this.productImageRepository.save(productImages)


        const responseDto = plainToInstance(ProductResponseDto, {
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            description: product.description,
            categories: categories,
            images: images,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });

        return responseDto;
    }

    async getProductByCategoryId(categoryId: string): Promise<Product[]> {
        if (!categoryId || !categoryId.trim()) {
            throw new BadRequestException('categoryId is required and cannot be empty');
        }

        return this.productRepository.find({
            where: {
                categories: {
                    category: {
                        categoryId,
                    }
                }
            },
            relations: ['categories', 'categories.category'],
        })
    }

    async updateProduct(productId: string, productDto: ProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { productId: productId } });
        if (product) {
            Object.assign(product, productDto);
            return this.productRepository.save(product);
        }
        return null;
    }

    async deleteProduct(productId: string): Promise<void> {
        const product = await this.productRepository.findOne({ where: { productId: productId } });
        if (product) {
            await this.productRepository.remove(product); // Xóa sản phẩm
        }
    }
}
