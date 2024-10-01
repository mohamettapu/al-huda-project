/*
  Warnings:

  - You are about to drop the column `firtsname` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firtsname",
ADD COLUMN     "firstname" TEXT NOT NULL;
