/*
  Warnings:

  - Added the required column `birthday` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `birthday` DATETIME(3) NOT NULL;
