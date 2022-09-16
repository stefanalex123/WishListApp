-- DropForeignKey
ALTER TABLE `buyitem` DROP FOREIGN KEY `BuyItem_userBuyerId_fkey`;

-- DropForeignKey
ALTER TABLE `contributioninvitation` DROP FOREIGN KEY `ContributionInvitation_userAskedId_fkey`;

-- DropForeignKey
ALTER TABLE `contributioninvitation` DROP FOREIGN KEY `ContributionInvitation_userContributerId_fkey`;

-- DropForeignKey
ALTER TABLE `mailsreferralsinvitations` DROP FOREIGN KEY `mailsReferralsInvitations_userDeliverId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `Notifications_userdeliverId_fkey`;

-- AddForeignKey
ALTER TABLE `BuyItem` ADD CONSTRAINT `BuyItem_userBuyerId_fkey` FOREIGN KEY (`userBuyerId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_userContributerId_fkey` FOREIGN KEY (`userContributerId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_userAskedId_fkey` FOREIGN KEY (`userAskedId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userdeliverId_fkey` FOREIGN KEY (`userdeliverId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mailsReferralsInvitations` ADD CONSTRAINT `mailsReferralsInvitations_userDeliverId_fkey` FOREIGN KEY (`userDeliverId`) REFERENCES `UserProfile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
