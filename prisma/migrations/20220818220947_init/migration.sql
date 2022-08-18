-- CreateTable
CREATE TABLE `adress` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `flat` VARCHAR(191) NOT NULL,
    `postalcode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `adress` ADD CONSTRAINT `adress_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
