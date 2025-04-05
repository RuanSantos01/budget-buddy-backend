import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: 'asc' | 'desc' = 'desc'
  ) {
    return this.transactionsService.findAll(userId, Number(page), Number(limit), {
      createdAt: sort,
    });
  }

  @Get(':id')
  findOne(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.transactionsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(userId, id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @ActiveUserId() userId: string,
    @Param('id') id: string
  ) {
    return this.transactionsService.remove(userId, id);
  }
}
