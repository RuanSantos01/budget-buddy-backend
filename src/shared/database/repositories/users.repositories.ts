import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: Prisma.UserCreateArgs) {
    return this.prisma.user.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(findUniqueDto);
  }

  async logicalDeleteUser(deleteUserDto: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(deleteUserDto);
  }
}
