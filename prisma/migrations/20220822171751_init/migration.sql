-- CreateTable
CREATE TABLE `BuyItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BuyItem_itemid_key`(`itemid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BuyItem` ADD CONSTRAINT `BuyItem_itemid_fkey` FOREIGN KEY (`itemid`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
