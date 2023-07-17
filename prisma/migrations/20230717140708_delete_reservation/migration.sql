/*
  Warnings:

  - You are about to drop the column `bathroomCount` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "bathroomCount";

-- DropTable
DROP TABLE "Reservation";
