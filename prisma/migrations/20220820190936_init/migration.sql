/*
  Warnings:

  - Added the required column `groupid` to the `wishlisttogroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wishlisttogroup` ADD COLUMN `groupid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `wishlisttogroup` ADD CONSTRAINT `wishlisttogroup_groupid_fkey` FOREIGN KEY (`groupid`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
