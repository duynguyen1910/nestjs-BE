

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/models/category.model';
import { CategoryDto } from 'src/modules/category/dtos/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getAllCategory(): Promise<Category[]> {
        return this.categoryService.getAllCategory();
    }

    @Post()
    async addCategory(@Body() createCategoryDto: CategoryDto): Promise<Category> {
        return this.categoryService.addCategory(createCategoryDto);
    }

}
