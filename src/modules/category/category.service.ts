import { Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDto } from "src/modules/category/dtos/category.dto";
import { Category } from "src/models/category.model";
import { Repository } from "typeorm";


@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>) { }

    async getAllCategory(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async addCategory(categoryDto: CategoryDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(categoryDto);
        return this.categoryRepository.save(newCategory);
    }
}