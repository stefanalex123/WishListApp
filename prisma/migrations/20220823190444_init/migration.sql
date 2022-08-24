-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `notificationdescription` VARCHAR(191) NOT NULL,
    `userdeliverid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userdeliverid_fkey` FOREIGN KEY (`userdeliverid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
