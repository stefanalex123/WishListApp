-- CreateTable
CREATE TABLE `ContributionInvitation` (
    `id` VARCHAR(191) NOT NULL,
    `itemid` VARCHAR(191) NOT NULL,
    `usercontributerid` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ContributionInvitation_itemid_key`(`itemid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_itemid_fkey` FOREIGN KEY (`itemid`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_usercontributerid_fkey` FOREIGN KEY (`usercontributerid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
