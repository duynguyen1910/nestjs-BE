import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "src/models/product.model";
import { Category } from "src/models/category.model";
import { ProductCategory } from "../product-category/product-category.entity";
import { ProductImage } from "src/models/product-image.model";


@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, ProductCategory, ProductImage])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [TypeOrmModule],
})

export class ProductModule { };