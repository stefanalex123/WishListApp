/*
  Warnings:

  - Added the required column `userinvitedId` to the `GroupInvitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groupinvitations` ADD COLUMN `userinvitedId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `GroupInvitations` ADD CONSTRAINT `GroupInvitations_userinvitedId_fkey` FOREIGN KEY (`userinvitedId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
