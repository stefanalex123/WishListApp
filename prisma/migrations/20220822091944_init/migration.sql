-- DropForeignKey
ALTER TABLE `groupinvitations` DROP FOREIGN KEY `GroupInvitations_userinvitedid_fkey`;

-- AddForeignKey
ALTER TABLE `GroupInvitations` ADD CONSTRAINT `GroupInvitations_userinvitedid_fkey` FOREIGN KEY (`userinvitedid`) REFERENCES `UserProfile`(`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
