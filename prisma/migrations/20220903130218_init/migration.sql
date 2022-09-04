-- CreateTable
CREATE TABLE `deleteAccount` (
    `id` VARCHAR(191) NOT NULL,
    `emailUsed` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `deleteAccount_emailUsed_key`(`emailUsed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `deleteAccount` ADD CONSTRAINT `deleteAccount_emailUsed_fkey` FOREIGN KEY (`emailUsed`) REFERENCES `UserProfile`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
