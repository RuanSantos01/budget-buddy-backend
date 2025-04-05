import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class BankAccountsRepository {
    
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prisma.bankAccount.create(createDto);
  }

  async findUnique(findBankAccountDto: Prisma.BankAccountFindUniqueArgs) {
    return this.prisma.bankAccount.findUnique(findBankAccountDto);
  }

  async findMany(params: { skip: number; take: number, sort?: Prisma.BankAccountOrderByWithRelationInput, where?: Prisma.BankAccountWhereInput }) {
    return this.prisma.bankAccount.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: params.sort,
      where: params.where
    });
  }

  async count(params: Prisma.BankAccountCountArgs) {
    return this.prisma.bankAccount.count(params);
  }

  async remove(userId: string, id: string) {
    return this.prisma.bankAccount.delete({
      where: { id, userId },
    });
  };

  async update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prisma.bankAccount.update(updateDto);
  }

}