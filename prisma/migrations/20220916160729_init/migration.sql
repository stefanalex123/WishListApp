-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `wishlist_userId_fkey`;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
