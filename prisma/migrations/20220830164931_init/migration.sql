-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `mailsNotifications` VARCHAR(191) NOT NULL,
    `socketId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserProfile_nickname_key`(`nickname`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `itemLink` VARCHAR(191) NOT NULL,
    `itemDescription` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DISPONIBLE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `flat` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlist` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `wishlistName` VARCHAR(191) NOT NULL,
    `wishlistDescription` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Unavailable, add at least one item to it',
    `wishlistNrItems` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemtowishlist` (
    `id` VARCHAR(191) NOT NULL,
    `wishlistId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group` (
    `id` VARCHAR(191) NOT NULL,
    `groupTitle` VARCHAR(191) NOT NULL,
    `groupDescription` VARCHAR(191) NOT NULL,
    `groupOwnerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlisttogroup` (
    `id` VARCHAR(191) NOT NULL,
    `wishlistId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupInvitations` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `userInvitedId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuyItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `userBuyerId` VARCHAR(191) NOT NULL,
    `userStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributionInvitation` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `userContributerId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `userAskedId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `notificationDescription` VARCHAR(191) NOT NULL,
    `deliverAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userdeliverId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mailsReferralsInvitations` (
    `id` VARCHAR(191) NOT NULL,
    `userDeliverId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `emailSend` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `adress` ADD CONSTRAINT `adress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemtowishlist` ADD CONSTRAINT `itemtowishlist_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `wishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemtowishlist` ADD CONSTRAINT `itemtowishlist_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlisttogroup` ADD CONSTRAINT `wishlisttogroup_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `wishlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlisttogroup` ADD CONSTRAINT `wishlisttogroup_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupInvitations` ADD CONSTRAINT `GroupInvitations_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupInvitations` ADD CONSTRAINT `GroupInvitations_userInvitedId_fkey` FOREIGN KEY (`userInvitedId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuyItem` ADD CONSTRAINT `BuyItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuyItem` ADD CONSTRAINT `BuyItem_userBuyerId_fkey` FOREIGN KEY (`userBuyerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_userContributerId_fkey` FOREIGN KEY (`userContributerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_userAskedId_fkey` FOREIGN KEY (`userAskedId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userdeliverId_fkey` FOREIGN KEY (`userdeliverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mailsReferralsInvitations` ADD CONSTRAINT `mailsReferralsInvitations_userDeliverId_fkey` FOREIGN KEY (`userDeliverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mailsReferralsInvitations` ADD CONSTRAINT `mailsReferralsInvitations_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
