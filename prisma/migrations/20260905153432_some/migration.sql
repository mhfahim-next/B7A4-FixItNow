/*
  Warnings:

  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - The `availability` column on the `TechnicianProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bookingId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechnicianProfile" DROP COLUMN "availability",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
