import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValueUtils } from 'src/shared/utils/value.util';
import { handlePrismaError } from 'src/shared/utils/exceptions.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsService {

  constructor(
    private readonly bankAccountRepo: BankAccountsRepository
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    try {
      const bankAccount = await this.bankAccountRepo.create({
        data: {
          userId,
          bankIspbId: createBankAccountDto.bankIspbId,
          name: createBankAccountDto.name,
          balance: createBankAccountDto.balance,
          createdAt: new Date()
        },
      })

      return {
        ...bankAccount,
        balance: ValueUtils.convertValue(bankAccount.balance),
      }
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(userId: string, page: number = 1, limit: number = 10, sort: Prisma.BankAccountOrderByWithRelationInput = { createdAt: 'desc' }) {
    const offset = (page - 1) * limit;
  
    const [bankAccounts, total] = await Promise.all([
      this.bankAccountRepo.findMany({
        skip: offset,
        take: limit,
        sort,
        where: { userId }
      }),
      this.bankAccountRepo.count({ where: { userId } }),
    ]);
  
    return {
      data: bankAccounts.map(bankAccount => ({
        ...bankAccount,
        value: ValueUtils.convertValue(bankAccount.balance),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountRepo.findUnique({
      where: { 
        id: bankAccountId,
        userId
       }
    });

    if (!bankAccount)
      throw new UnprocessableEntityException('Bank account not found or user not authorized to see this resource.');

    return {
      ...bankAccount,
      value: ValueUtils.convertValue(bankAccount.balance),
    }
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    try {
      const bankAccountUpdated = await this.bankAccountRepo.update({
        where: { 
          id: bankAccountId,
          userId
        },
        data: updateBankAccountDto,
      });
  
      return {
        ...bankAccountUpdated,
        value: ValueUtils.convertValue(bankAccountUpdated.balance),
      };
    } catch (error) {
      console.log(error);
      handlePrismaError(error);
    }
  }

  remove(userId: string, bankAccountId: string) {
    return this.bankAccountRepo.remove(userId, bankAccountId);
  }
}
