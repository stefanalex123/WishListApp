-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Processing, you need to add at least one item to make it vizible for other users';
