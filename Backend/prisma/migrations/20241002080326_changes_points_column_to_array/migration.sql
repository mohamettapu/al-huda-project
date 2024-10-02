/*
  Warnings:

  - The `points` column on the `Evaluations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Evaluations" DROP COLUMN "points",
ADD COLUMN     "points" INTEGER[];
