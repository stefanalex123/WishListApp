/*
  Warnings:

  - You are about to drop the column `ItemTitle` on the `items` table. All the data in the column will be lost.
  - The required column `id` was added to the `items` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `items_ItemName_key` ON `items`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `ItemTitle`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ALTER COLUMN `ItemName` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);
