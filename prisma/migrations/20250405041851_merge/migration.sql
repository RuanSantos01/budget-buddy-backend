-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_bank_ispb_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_bank_ispb_id_fkey" FOREIGN KEY ("bank_ispb_id") REFERENCES "Bank"("ispb") ON DELETE RESTRICT ON UPDATE CASCADE;
