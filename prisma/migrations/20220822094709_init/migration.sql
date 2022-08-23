/*
  Warnings:

  - Added the required column `wishlistnritems` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `wishlistnritems` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Unavailable, add at least one item to it';
