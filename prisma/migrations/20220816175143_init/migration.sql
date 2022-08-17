-- CreateTable
CREATE TABLE `users` (
    `userName` VARCHAR(191) NOT NULL DEFAULT 'root',
    `password` VARCHAR(191) NOT NULL DEFAULT 'root',

    UNIQUE INDEX `users_userName_key`(`userName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `ItemName` VARCHAR(191) NOT NULL DEFAULT 'r',
    `UserName` VARCHAR(191) NOT NULL,
    `ItemTitle` VARCHAR(191) NOT NULL DEFAULT 'root',
    `ItemLink` VARCHAR(191) NOT NULL,
    `ItemDescription` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `items_ItemName_key`(`ItemName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_UserName_fkey` FOREIGN KEY (`UserName`) REFERENCES `users`(`userName`) ON DELETE CASCADE ON UPDATE CASCADE;
