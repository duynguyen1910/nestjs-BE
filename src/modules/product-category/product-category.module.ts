import { Module } from "@nestjs/common";
import { ProductCategoryService } from "./product-category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategory } from "./product-category.entity";


@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    providers: [ProductCategoryService],
    exports: [ProductCategoryService],
})

export class ProductCategoryModule { }