/*
  Warnings:

  - Added the required column `secretKey` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "secretKey" TEXT NOT NULL;
