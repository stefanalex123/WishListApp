-- CreateTable
CREATE TABLE `GroupInvitations` (
    `id` VARCHAR(191) NOT NULL,
    `groupid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupInvitations` ADD CONSTRAINT `GroupInvitations_groupid_fkey` FOREIGN KEY (`groupid`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
