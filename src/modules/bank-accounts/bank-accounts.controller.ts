import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: 'asc' | 'desc' = 'desc'
  ) {
    return this.bankAccountsService.findAll(userId, Number(page), Number(limit), {
      createdAt: sort,
    });
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.bankAccountsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id') id: string, 
    @Body() updateBankAccountDto: UpdateBankAccountDto
  ) {
    return this.bankAccountsService.update(userId, id, updateBankAccountDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.bankAccountsService.remove(userId, id);
  }
}
