import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// Todo provider é privado do módulo, não pode ser acessado fora do módulo, a não ser que seja exportado
// Todo o controller é público, pode ser acessado fora do módulo
// Todo o módulo é público, pode ser acessado fora do módulo
