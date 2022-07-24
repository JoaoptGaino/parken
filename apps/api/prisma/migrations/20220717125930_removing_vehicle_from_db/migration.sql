/*
  Warnings:

  - You are about to drop the column `vehicle_id` on the `receipt` table. All the data in the column will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_vehicle_id_fkey";

-- DropIndex
DROP INDEX "receipt_vehicle_id_key";

-- AlterTable
ALTER TABLE "receipt" DROP COLUMN "vehicle_id";

-- DropTable
DROP TABLE "vehicles";
