/*
  Warnings:

  - Added the required column `phonenumber` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `phonenumber` VARCHAR(191) NOT NULL;
