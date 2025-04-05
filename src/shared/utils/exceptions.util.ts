import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaError(error: PrismaClientKnownRequestError): void {
  throw new InternalServerErrorException(`Database error: ${error.meta?.field_name}`);
}