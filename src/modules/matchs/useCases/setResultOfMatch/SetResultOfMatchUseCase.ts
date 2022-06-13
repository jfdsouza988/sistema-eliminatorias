import { inject, injectable } from 'tsyringe';
import {
  IChampionshipCompleteInfo,
  IChampionshipRepository,
} from '../../../championships/repositories/IChampionshipRepository';
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

    const championship = (await this.championshipRepository.findById(
      existsMatch.championshipId,
    )) as IChampionshipCompleteInfo;

    championship.eliminated.push(loser);

    const teamsEliminatedUpdated = await this.championshipRepository.updateEliminated(
      existsMatch.championshipId,
      championship.eliminated,
    );

    if (teamsEliminatedUpdated.eliminated.length === championship.teams.length - 1) {
      await this.championshipRepository.updateStatus(championship.name, 'finish');

      championship.teams.forEach(async (team) => {
        if (!teamsEliminatedUpdated.eliminated.includes(team.name)) {
          await this.championshipRepository.updateChampion(championship.id, team.name);
        }
      });

      return {
        message: 'Championship finished',
      };
    }

    return updateResultOfMatch;
  }
}
