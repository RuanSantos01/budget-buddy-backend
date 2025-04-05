import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repositories';
import { UsersRepository } from './repositories/users.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository, BankAccountsRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
