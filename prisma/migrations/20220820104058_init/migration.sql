-- CreateTable
CREATE TABLE `group` (
    `id` VARCHAR(191) NOT NULL,
    `grouptitle` VARCHAR(191) NOT NULL,
    `groupdescription` VARCHAR(191) NOT NULL,
    `groupownerid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
