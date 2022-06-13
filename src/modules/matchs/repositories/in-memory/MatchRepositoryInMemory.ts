import { Match, MatchStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ICreateMatchDTO } from 'modules/matchs/dtos/ICreateMatchDTO';
import { IMatchRepository } from '../IMatchRepository';

class MatchRepositoryInMemory implements IMatchRepository {
  matchs: Match[] = [];

  async create(data: ICreateMatchDTO): Promise<Match> {
    const match = {
      id: randomUUID(),
      matchNumber: data.matchNumber,
      teamA: data.teamA,
      resultTeamA: null,
      teamB: data.teamB,
      resultTeamB: null,
      winner: null,
      championshipId: data.championshipId,
      status: MatchStatus.PROGRESS,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    this.matchs.push(match);

    return match;
  }

  async updateResult(id: string, teamA: number, teamB: number, winner: string): Promise<Match> {
    const match = this.matchs.find((match) => match.id === id) as Match;

    match.resultTeamA = teamA;
    match.resultTeamB = teamB;
    match.winner = winner;
    match.status = MatchStatus.FINISHED;

    return match;
  }

  async findById(id: string): Promise<Match | null> {
    return this.matchs.find((match) => match.id === id) as Match;
  }

  async findMatchsInProgressByChampionship(championshipId: string): Promise<Match[]> {
    let matchsInProgress: Match[] = [];

    this.matchs.forEach((match) => {
      if (match.championshipId === championshipId && match.status === 'PROGRESS') {
        matchsInProgress.push(match);
      }
    });

    return matchsInProgress;
  }
}

export { MatchRepositoryInMemory };
