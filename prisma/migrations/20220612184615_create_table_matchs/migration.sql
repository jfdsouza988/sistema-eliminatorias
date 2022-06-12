-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PROGRESS', 'FINISHED');

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "teamA" TEXT NOT NULL,
    "resultTeamA" INTEGER,
    "teamB" TEXT NOT NULL,
    "resultTeamB" INTEGER,
    "winner" TEXT,
    "championshipId" TEXT NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT E'PROGRESS',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "match_id_key" ON "match"("id");

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "championship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
