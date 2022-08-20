-- CreateTable
CREATE TABLE `itemtowishlist` (
    `id` VARCHAR(191) NOT NULL,
    `wishlistid` VARCHAR(191) NOT NULL,
    `itemid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itemtowishlist` ADD CONSTRAINT `itemtowishlist_wishlistid_fkey` FOREIGN KEY (`wishlistid`) REFERENCES `wishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemtowishlist` ADD CONSTRAINT `itemtowishlist_itemid_fkey` FOREIGN KEY (`itemid`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
