/*
  Warnings:

  - You are about to drop the column `createdAt` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `optionA` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_a` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_b` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_c` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_d` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_text` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_id` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_facultyId_fkey";

-- DropIndex
DROP INDEX "questions_questionText_idx";

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "optionA",
DROP COLUMN "optionB",
DROP COLUMN "optionC",
DROP COLUMN "optionD",
DROP COLUMN "questionText",
DROP COLUMN "subjectId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "option_a" TEXT NOT NULL,
ADD COLUMN     "option_b" TEXT NOT NULL,
ADD COLUMN     "option_c" TEXT NOT NULL,
ADD COLUMN     "option_d" TEXT NOT NULL,
ADD COLUMN     "question_text" TEXT NOT NULL,
ADD COLUMN     "subject_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "createdAt",
DROP COLUMN "facultyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "faculty_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "facultyId",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "faculty_id" TEXT NOT NULL,
ADD COLUMN     "first_name" VARCHAR(64) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(128) NOT NULL,
ADD COLUMN     "middle_name" VARCHAR(128),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "questions_question_text_idx" ON "questions"("question_text");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
