import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';

export class CreateTransactionDto {

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  bankAccountId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  value: number;

  @IsNotEmpty()
  @IsEnum(TransactionType, { message: 'Type must be either INCOME or EXPENSE' })
  type: TransactionType;

}