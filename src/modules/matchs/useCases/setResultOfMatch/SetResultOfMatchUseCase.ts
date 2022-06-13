import { inject, injectable } from 'tsyringe';
import { IChampionshipRepository } from '../../../championships/repositories/IChampionshipRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IMatchRepository } from '../../repositories/IMatchRepository';

interface IRequest {
  id: string;
  teamA: number;
  teamB: number;
}

@injectable()
export class SetResultOfMatchUseCase {
  constructor(
    @inject('MatchRepository')
    private matchRepository: IMatchRepository,
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute({ id, teamA, teamB }: IRequest) {
    if (!id || !teamA || !teamB) {
      throw new AppError('Invalid or not provided parameters');
    }

    if (!Number.isInteger(teamA) || !Number.isInteger(teamB)) {
      throw new AppError('Invalid values for result of match');
    }

    const existsMatch = await this.matchRepository.findById(id);

    if (!existsMatch || existsMatch.status === 'FINISHED') {
      throw new AppError('Match not found or finished');
    }

    let winner: string;
    let loser: string;

    if (teamA > teamB) {
      winner = existsMatch.teamA;
      loser = existsMatch.teamB;
    } else {
      winner = existsMatch.teamB;
      loser = existsMatch.teamA;
    }

    const updateResultOfMatch = await this.matchRepository.updateResult(id, teamA, teamB, winner);

    const championship = await this.championshipRepository.findById(existsMatch.championshipId);

    if (championship) {
      championship.eliminated.push(loser);
      await this.championshipRepository.updateEliminated(existsMatch.championshipId, championship.eliminated);
    }

    return updateResultOfMatch;
  }
}
