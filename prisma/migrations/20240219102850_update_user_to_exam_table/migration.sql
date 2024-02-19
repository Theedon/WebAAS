/*
  Warnings:

  - You are about to drop the `UserToExam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToExam" DROP CONSTRAINT "UserToExam_clerk_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone_no" TEXT;

-- DropTable
DROP TABLE "UserToExam";

-- CreateTable
CREATE TABLE "user_to_exam" (
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_to_exam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_to_exam_clerk_id_key" ON "user_to_exam"("clerk_id");

-- AddForeignKey
ALTER TABLE "user_to_exam" ADD CONSTRAINT "user_to_exam_clerk_id_fkey" FOREIGN KEY ("clerk_id") REFERENCES "users"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
