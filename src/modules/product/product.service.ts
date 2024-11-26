import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from 'src/modules/product/dtos/product.dto';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async getAllProduct(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getProductById(productId: string): Promise<Product> {
        return this.productRepository.findOne({ where: { productId: productId } });
    }

    async addProduct(productDto: ProductDto): Promise<Product> {
        const product = this.productRepository.create(productDto);
        return this.productRepository.save(product);
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
