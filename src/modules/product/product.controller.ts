import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/modules/product/dtos/product.dto';
import { Product } from 'src/models/product.model';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productService.getAllProduct();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post()
    async addProduct(@Body() productDto: ProductDto): Promise<Product> {
        return this.productService.addProduct(productDto);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productDto: ProductDto): Promise<Product> {
        return this.productService.updateProduct(id, productDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}
