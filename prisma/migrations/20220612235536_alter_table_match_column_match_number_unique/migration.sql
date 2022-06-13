/*
  Warnings:

  - A unique constraint covering the columns `[matchNumber]` on the table `match` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "match_matchNumber_key" ON "match"("matchNumber");
