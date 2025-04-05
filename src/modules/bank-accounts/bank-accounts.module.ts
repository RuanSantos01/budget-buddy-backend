import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, BankAccountsRepository, PrismaService],
})
export class BankAccountsModule {}
