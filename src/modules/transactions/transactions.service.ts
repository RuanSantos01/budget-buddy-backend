import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { randomUUID } from 'crypto';
import { handlePrismaError } from 'src/shared/utils/exceptions.util';

@Injectable()
export class TransactionsService {

  constructor(
    private readonly transactionsRepo: TransactionsRepository
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      return await this.transactionsRepo.create({
        data: {
          userId: userId,
          categoryId: createTransactionDto.categoryId,
          bankAccountId: createTransactionDto.bankAccountId,
          name: createTransactionDto.name,
          value: createTransactionDto.value,
          createdAt: new Date(),
          type: createTransactionDto.type
        },
      })
    } catch (error) {
      handlePrismaError(error);
    }
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: any) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
