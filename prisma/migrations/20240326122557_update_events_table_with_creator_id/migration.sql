/*
  Warnings:

  - You are about to drop the column `sender_id` on the `events` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_sender_id_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "sender_id",
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "event_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
