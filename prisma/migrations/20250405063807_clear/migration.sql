/*
  Warnings:

  - Added the required column `createdAt` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
