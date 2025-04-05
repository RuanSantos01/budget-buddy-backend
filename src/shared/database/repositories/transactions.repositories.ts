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

  async findMany(params: { skip: number; take: number, sort?: Prisma.TransactionOrderByWithRelationInput }) {
    return this.prisma.transaction.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: params.sort
    });
  }

  async count() {
    return this.prisma.transaction.count();
  }

  async remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  };

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prisma.transaction.update(updateDto);
  }

}