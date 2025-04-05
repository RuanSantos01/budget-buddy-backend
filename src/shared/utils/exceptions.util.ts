import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaError(error: PrismaClientKnownRequestError): void {
  // Log do erro para depuração
  console.error('Unexpected error:', error);

  throw new InternalServerErrorException(`Database error: ${error.meta?.field_name}`);
}