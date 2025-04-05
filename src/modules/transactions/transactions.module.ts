import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository, PrismaService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
