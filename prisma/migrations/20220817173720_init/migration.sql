/*
  Warnings:

  - Added the required column `itemname` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `itemname` VARCHAR(191) NOT NULL;
