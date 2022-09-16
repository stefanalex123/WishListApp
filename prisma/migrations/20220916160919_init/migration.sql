-- DropForeignKey
ALTER TABLE `adress` DROP FOREIGN KEY `adress_userId_fkey`;

-- AddForeignKey
ALTER TABLE `adress` ADD CONSTRAINT `adress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
