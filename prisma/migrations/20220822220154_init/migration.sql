/*
  Warnings:

  - Added the required column `useraskedid` to the `ContributionInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contributioninvitation` ADD COLUMN `useraskedid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ContributionInvitation` ADD CONSTRAINT `ContributionInvitation_useraskedid_fkey` FOREIGN KEY (`useraskedid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
