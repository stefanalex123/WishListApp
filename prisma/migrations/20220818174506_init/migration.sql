/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserProfile_userid_key` ON `UserProfile`(`userid`);
