/*
  Warnings:

  - You are about to drop the column `location` on the `adress` table. All the data in the column will be lost.
  - Added the required column `city` to the `adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adress` DROP COLUMN `location`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL;
