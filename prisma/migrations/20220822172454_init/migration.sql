/*
  Warnings:

  - Added the required column `userbuyerid` to the `BuyItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buyitem` ADD COLUMN `userbuyerid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BuyItem` ADD CONSTRAINT `BuyItem_userbuyerid_fkey` FOREIGN KEY (`userbuyerid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
