/*
  Warnings:

  - You are about to drop the column `titre` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `city` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "titre",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
