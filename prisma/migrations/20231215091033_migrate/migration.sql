-- DropForeignKey
ALTER TABLE "Borrows" DROP CONSTRAINT "borrowers_fk";

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500);

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "borrowers_fk" FOREIGN KEY ("borrower_UUID") REFERENCES "Borrowers"("borrower_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
