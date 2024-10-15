/*
  Warnings:

  - The values [ACADEMIC_PERFORMANCE,EXTERNAL_SUPERVISION,STUDENT_FEEDBACK] on the enum `AssessmentArea` will be removed. If these variants are still used in the database, this will fail.
  - The values [AVERAGE_CLASS_GRADES,CLASSROOM_MANAGEMENT,POSITIVE_STUDENT_INTERACTIONS] on the enum `Criteria` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssessmentArea_new" AS ENUM ('SUPERVISION_FEEDBACK');
ALTER TABLE "Evaluations" ALTER COLUMN "assessmentArea" TYPE "AssessmentArea_new"[] USING ("assessmentArea"::text::"AssessmentArea_new"[]);
ALTER TYPE "AssessmentArea" RENAME TO "AssessmentArea_old";
ALTER TYPE "AssessmentArea_new" RENAME TO "AssessmentArea";
DROP TYPE "AssessmentArea_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Criteria_new" AS ENUM ('INSTRUCTIONAL_STRATEGIES');
ALTER TABLE "Evaluations" ALTER COLUMN "criteria" TYPE "Criteria_new"[] USING ("criteria"::text::"Criteria_new"[]);
ALTER TYPE "Criteria" RENAME TO "Criteria_old";
ALTER TYPE "Criteria_new" RENAME TO "Criteria";
DROP TYPE "Criteria_old";
COMMIT;
