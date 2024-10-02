-- CreateEnum
CREATE TYPE "AssessmentArea" AS ENUM ('SUPERVISION_FEEDBACK', 'ACADEMIC_PERFORMANCE', 'EXTERNAL_SUPERVISION', 'STUDENT_FEEDBACK');

-- CreateEnum
CREATE TYPE "Criteria" AS ENUM ('INSTRUCTIONAL_STRATEGIES', 'AVERAGE_CLASS_GRADES', 'CLASSROOM_MANAGEMENT', 'POSITIVE_STUDENT_INTERACTIONS');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('EXCEEDS_EXPECTATION', 'MEETS_EXPECTATION', 'NEEDS_IMPROVEMENT', 'UNSATISFACTORY');

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "assessmentArea" "AssessmentArea"[],
    "criteria" "Criteria"[],
    "rating" "Rating"[],
    "points" INTEGER,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phone_key" ON "Teacher"("phone");

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
