import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async insertMany(categoyDto: CategoryDto[]) {
    return this.categoriesRepository.insertMany(categoyDto);
  }

  async create(categoryDto: CategoryDto) {
    return this.categoriesRepository.create({
      data: categoryDto,
    });
  }

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async delete(id: string) {
    const category = await this.categoriesRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    try {
      await this.categoriesRepository.delete({ id });
      return { message: 'Category deleted successfully.', category };
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  async update(id: string, categoryDto: CategoryDto) {
    const category = await this.categoriesRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    try {
      const updatedCategory = await this.categoriesRepository.update({
        where: { id },
        data: categoryDto,
      });
      return updatedCategory;
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }
}
