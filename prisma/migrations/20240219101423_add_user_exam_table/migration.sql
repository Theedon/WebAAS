/*
  Warnings:

  - You are about to drop the column `ai_recommendation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `test_information` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ai_recommendation",
DROP COLUMN "test_information";

-- CreateTable
CREATE TABLE "UserToExam" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "test_information" BYTEA,
    "ai_recommendation" BYTEA,
    "rec_course_1" TEXT,
    "rec_course_2" TEXT,
    "rec_course_3" TEXT,
    "anti_course_1" TEXT,
    "anti_course_2" TEXT,
    "anti_course_3" TEXT,

    CONSTRAINT "UserToExam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToExam_clerk_id_key" ON "UserToExam"("clerk_id");

-- AddForeignKey
ALTER TABLE "UserToExam" ADD CONSTRAINT "UserToExam_clerk_id_fkey" FOREIGN KEY ("clerk_id") REFERENCES "users"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
