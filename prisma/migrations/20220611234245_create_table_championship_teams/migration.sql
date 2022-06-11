-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "championships_teams" (
    "id" TEXT NOT NULL,
    "id_championship" TEXT NOT NULL,
    "id_team" TEXT NOT NULL,

    CONSTRAINT "championships_teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_id_key" ON "team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "team_name_key" ON "team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "championships_teams_id_key" ON "championships_teams"("id");

-- AddForeignKey
ALTER TABLE "championships_teams" ADD CONSTRAINT "championships_teams_id_championship_fkey" FOREIGN KEY ("id_championship") REFERENCES "championship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "championships_teams" ADD CONSTRAINT "championships_teams_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
