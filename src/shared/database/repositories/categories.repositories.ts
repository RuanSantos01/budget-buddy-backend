import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insertMany(categories: Prisma.CategoryCreateManyInput[]) {
    return this.prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
  }

  async create(category: Prisma.CategoryCreateArgs) {
    return this.prisma.category.create(category);
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async delete(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.delete({ where });
  }

  async findOne(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findUnique({ where });
  }

  async update(args: Prisma.CategoryUpdateArgs) {
    return this.prisma.category.update(args);
  }
}
