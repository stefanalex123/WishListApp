/*
  Warnings:

  - You are about to alter the column `wishlistnritems` on the `wishlist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `wishlist` MODIFY `wishlistnritems` INTEGER NOT NULL DEFAULT 0;
