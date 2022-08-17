/*
  Warnings:

  - You are about to drop the column `username` on the `items` table. All the data in the column will be lost.
  - Added the required column `userid` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_username_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `username`,
    ADD COLUMN `userid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
