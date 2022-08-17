/*
  Warnings:

  - You are about to drop the column `ItemName` on the `items` table. All the data in the column will be lost.
  - The required column `id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `ItemName`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ALTER COLUMN `userName` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);
