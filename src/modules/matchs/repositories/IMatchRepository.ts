import { Match } from '@prisma/client';
import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';

interface IMatchRepository {
  create(data: ICreateMatchDTO): Promise<Match>;
  updateResult(id: string, teamA: number, teamB: number, winner: string): Promise<Match>;
  findById(id: string): Promise<Match | null>;
  findMatchsInProgressByChampionship(championshipId: string): Promise<Match[]>;
}

export { IMatchRepository };
