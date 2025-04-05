import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersGuard } from './modules/users/users.guard';
import { UsersModule } from './modules/users/users.module';
import { env } from './shared/config/env';
import { DatabaseModule } from './shared/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    CategoriesModule,
    TransactionsModule,
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UsersGuard,
    },
  ],
})
export class AppModule {}
