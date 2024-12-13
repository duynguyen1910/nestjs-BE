import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { CategoryDto } from 'src/modules/category/dto';
import { Category } from 'src/modules/category/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  Repository<Category>
> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async getAllCategory(): Promise<Category[]> {
    return this._find();
  }

  async addCategory(categoryDto: CategoryDto): Promise<Category> {
    const newCategory = await this._create(categoryDto);
    return this._save(newCategory);
  }

  async getCategoriesByIds(categoryIds: string[]): Promise<Category[]> {
    if (!Array.isArray(categoryIds) || !categoryIds.length) {
      throw new BadRequestException(
        'Invalid categoryIds: Must be a non-empty array',
      );
    }

    return this._findByIds('categoryId', categoryIds);
  }
}
