/*
  Warnings:

  - You are about to drop the `championships_teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "championships_teams" DROP CONSTRAINT "championships_teams_id_championship_fkey";

-- DropForeignKey
ALTER TABLE "championships_teams" DROP CONSTRAINT "championships_teams_id_team_fkey";

-- DropTable
DROP TABLE "championships_teams";

-- CreateTable
CREATE TABLE "_championship_teams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_championship_teams_AB_unique" ON "_championship_teams"("A", "B");

-- CreateIndex
CREATE INDEX "_championship_teams_B_index" ON "_championship_teams"("B");

-- AddForeignKey
ALTER TABLE "_championship_teams" ADD CONSTRAINT "_championship_teams_A_fkey" FOREIGN KEY ("A") REFERENCES "championship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_championship_teams" ADD CONSTRAINT "_championship_teams_B_fkey" FOREIGN KEY ("B") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
