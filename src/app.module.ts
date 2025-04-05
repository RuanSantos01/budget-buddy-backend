import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { env } from './shared/config/env';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    BankAccountsModule,
    CategoriesModule,
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
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
