import { Match, MatchStatus } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { ICreateMatchDTO } from '../../dtos/ICreateMatchDTO';
import { IMatchRepository } from '../IMatchRepository';

class MatchRepository implements IMatchRepository {
  async create(data: ICreateMatchDTO): Promise<Match> {
    const match = await prisma.match.create({
      data,
    });

    return match;
  }

  async updateResult(id: string, teamA: number, teamB: number, winner: string): Promise<Match> {
    const setResultOfMatch = await prisma.match.update({
      where: {
        id,
      },
      data: {
        resultTeamA: teamA,
        resultTeamB: teamB,
        status: MatchStatus.FINISHED,
        winner,
      },
    });

    return setResultOfMatch;
  }

  async findById(id: string): Promise<Match | null> {
    const match = await prisma.match.findUnique({
      where: {
        id,
      },
    });

    return match;
  }

  async findMatchsInProgressByChampionship(championshipId: string): Promise<Match[]> {
    const matchInProgress = await prisma.match.findMany({
      where: {
        championshipId,
        status: MatchStatus.PROGRESS,
      },
    });

    return matchInProgress;
  }
}

export { MatchRepository };
