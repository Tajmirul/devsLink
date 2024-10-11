/*
  Warnings:

  - You are about to drop the column `type` on the `Link` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('GITHUB', 'LINKEDIN', 'FACEBOOK', 'TWITTER', 'INSTAGRAM', 'YOUTUBE', 'WEBSITE', 'OTHER');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ADD COLUMN     "platform" "PlatformType" NOT NULL;

-- DropEnum
DROP TYPE "LinkType";
