import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: Prisma.TransactionCreateArgs) {
    return this.prisma.transaction.create(createDto);
  }

  async findUnique(findTransactionDto: Prisma.TransactionFindUniqueArgs) {
    return this.prisma.transaction.findUnique(findTransactionDto);
  }

  async findMany(params: { skip: number; take: number, sort?: Prisma.TransactionOrderByWithRelationInput, where?: Prisma.TransactionWhereInput }) {
    return this.prisma.transaction.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: params.sort,
      where: params.where
    });
  }

  async count(params: Prisma.TransactionCountArgs) {
    return this.prisma.transaction.count(params);
  }

  async remove(userId: string, id: string) {
    return this.prisma.transaction.delete({
      where: { id, userId },
    });
  };

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prisma.transaction.update(updateDto);
  }

}