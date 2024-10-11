/*
  Warnings:

  - You are about to drop the column `avater` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avater",
ADD COLUMN     "avatar" TEXT;
