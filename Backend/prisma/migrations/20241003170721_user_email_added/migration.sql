/*
  Warnings:

  - You are about to drop the column `user_phone` on the `resetPasswordCodes` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `resetPasswordCodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resetPasswordCodes" DROP COLUMN "user_phone",
ADD COLUMN     "userEmail" TEXT NOT NULL;
