-- AlterTable
ALTER TABLE `itemtowishlist` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `group` (
    `id` VARCHAR(191) NOT NULL,
    `grouptitle` VARCHAR(191) NOT NULL,
    `groupdescription` VARCHAR(191) NOT NULL,
    `groupownerid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlisttogroup` (
    `id` VARCHAR(191) NOT NULL,
    `wishlistid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wishlisttogroup` ADD CONSTRAINT `wishlisttogroup_wishlistid_fkey` FOREIGN KEY (`wishlistid`) REFERENCES `wishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
