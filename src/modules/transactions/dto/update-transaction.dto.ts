import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';

export class UpdateTransactionDto {

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  bankAccountId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  value: number;

  @IsOptional()
  @IsEnum(TransactionType, { message: 'Type must be either INCOME or EXPENSE' })
  type: TransactionType;

}