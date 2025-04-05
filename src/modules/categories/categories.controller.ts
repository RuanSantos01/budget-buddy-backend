import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('many')
  insertMany(@Body() categoryDto: CategoryDto[]) {
    return this.categoriesService.insertMany(categoryDto);
  }

  @Post()
  create(@Body() categoryDto: CategoryDto) {
    return this.categoriesService.create(categoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.categoriesService.delete(id);
  }

  @Put()
  update(@Query('id') id: string, @Body() categoryDto: CategoryDto) {
    return this.categoriesService.update(id, categoryDto);
  }
}
