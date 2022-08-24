/*
  Warnings:

  - You are about to drop the column `delieverat` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `delieverat`,
    ADD COLUMN `deliverat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
