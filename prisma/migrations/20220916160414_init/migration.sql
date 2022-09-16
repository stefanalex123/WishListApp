-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_userId_fkey`;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
