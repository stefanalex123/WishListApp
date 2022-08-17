/*
  Warnings:

  - You are about to drop the column `ItemDescription` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `ItemLink` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemdescription` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemlink` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_UserName_fkey`;

-- DropIndex
DROP INDEX `users_userName_key` ON `users`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `ItemDescription`,
    DROP COLUMN `ItemLink`,
    DROP COLUMN `UserName`,
    ADD COLUMN `itemdescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `itemlink` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `userName`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
