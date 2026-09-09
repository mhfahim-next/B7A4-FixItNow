/*
  Warnings:

  - You are about to drop the column `technicianId` on the `Bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_technicianId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "technicianId",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "timeSlot" TEXT;
