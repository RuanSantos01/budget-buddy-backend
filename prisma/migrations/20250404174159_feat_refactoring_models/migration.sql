/*
  Warnings:

  - You are about to drop the column `color` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `initial_balance` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `balance` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_ispb_id` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "color",
DROP COLUMN "initial_balance",
DROP COLUMN "type",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bank_ispb_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "bank_account_type";

-- CreateTable
CREATE TABLE "Bank" (
    "ispb" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("ispb")
);

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_bank_ispb_id_fkey" FOREIGN KEY ("bank_ispb_id") REFERENCES "Bank"("ispb") ON DELETE NO ACTION ON UPDATE CASCADE;
