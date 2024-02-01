/*
  Warnings:

  - The `subscribe` column on the `Channel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unsubscribe` column on the `Channel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `likes` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dislikes` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "subscribe",
ADD COLUMN     "subscribe" INTEGER[],
DROP COLUMN "unsubscribe",
ADD COLUMN     "unsubscribe" INTEGER[];

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER[],
DROP COLUMN "dislikes",
ADD COLUMN     "dislikes" INTEGER[];
