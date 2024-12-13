import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductResponseDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('categoryId') categoryId?: string,
  ): Promise<ProductResponseDto[]> {
    if (categoryId) {
      return this.productService.getProductByCategoryId(categoryId);
    }

    return this.productService.getAllProduct();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.createProduct(createProductDto);
  }

  // @Put(':id')
  // async updateProduct(@Param('id') id: string, @Body() productDto: ProductDto): Promise<Product> {
  //     return this.productService.updateProduct(id, productDto);
  // }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    // return this.productService.deleteProduct(id);
  }
}
