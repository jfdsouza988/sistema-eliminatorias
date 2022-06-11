-- CreateEnum
CREATE TYPE "ChampionshipStatus" AS ENUM ('PENDING', 'INITIATED', 'FINISHED');

-- CreateTable
CREATE TABLE "championship" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "award" INTEGER NOT NULL,
    "champion" TEXT,
    "status" "ChampionshipStatus" NOT NULL DEFAULT E'PENDING',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "championship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "championship_id_key" ON "championship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "championship_name_key" ON "championship"("name");
