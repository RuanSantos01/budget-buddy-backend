import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: Prisma.UserCreateArgs) {
    return this.prisma.user.create(createDto);
  }

  async findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(findUniqueDto);
  }

}