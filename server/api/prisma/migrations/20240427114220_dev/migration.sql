/*
  Warnings:

  - You are about to drop the column `googlePay` on the `CashCollection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CashCollection" DROP CONSTRAINT "CashCollection_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cashCollectionId_fkey";

-- AlterTable
ALTER TABLE "CashCollection" DROP COLUMN "googlePay",
ADD COLUMN     "payPalEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashCollection" ADD CONSTRAINT "CashCollection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cashCollectionId_fkey" FOREIGN KEY ("cashCollectionId") REFERENCES "CashCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
