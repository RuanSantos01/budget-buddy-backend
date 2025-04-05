import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { type Prisma } from "@prisma/client";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: Prisma.TransactionCreateArgs) {
    return this.prisma.transaction.create(createDto);
  }

}