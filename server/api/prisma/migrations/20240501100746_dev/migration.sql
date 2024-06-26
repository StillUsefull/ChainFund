/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_collectionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "collectionId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
