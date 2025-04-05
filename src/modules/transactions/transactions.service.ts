import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { handlePrismaError } from 'src/shared/utils/exceptions.util';
import { ValueUtils } from 'src/shared/utils/value.util';
import { Prisma } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {

  constructor(
    private readonly transactionsRepo: TransactionsRepository
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const transaction = await this.transactionsRepo.create({
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

      return {
        ...transaction,
        value: ValueUtils.convertValue(transaction.value),
      }
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(userId: string, page: number = 1, limit: number = 10, sort: Prisma.TransactionOrderByWithRelationInput = { createdAt: 'desc' }) {
    const offset = (page - 1) * limit;
  
    const [transactions, total] = await Promise.all([
      this.transactionsRepo.findMany({
        skip: offset,
        take: limit,
        sort,
        where: { userId }
      }),
      this.transactionsRepo.count({ where: { userId } }),
    ]);
  
    return {
      data: transactions.map(transaction => ({
        ...transaction,
        value: ValueUtils.convertValue(transaction.value),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepo.findUnique({
      where: { 
        id: transactionId,
        userId
       }
    });

    if (!transaction)
      throw new UnprocessableEntityException('Transaction not found');

    return {
      ...transaction,
      value: ValueUtils.convertValue(transaction.value),
    }
  }

  async update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const updatedTransaction = await this.transactionsRepo.update({
        where: { 
          id: transactionId,
          userId
        },
        data: updateTransactionDto,
      });
  
      return {
        ...updatedTransaction,
        value: ValueUtils.convertValue(updatedTransaction.value),
      };
    } catch (error) {
      console.log(error);
      handlePrismaError(error);
    }
  }

  remove(userId: string, transactionId: string) {
    return this.transactionsRepo.remove(userId, transactionId);
  }
}
