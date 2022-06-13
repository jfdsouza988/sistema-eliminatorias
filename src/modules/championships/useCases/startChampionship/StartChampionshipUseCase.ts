import { inject, injectable } from 'tsyringe';
import { IMatchRepository } from '../../../matchs/repositories/IMatchRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class StartChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
    @inject('MatchRepository')
    private matchRepository: IMatchRepository,
  ) {}

  async execute(name: string) {
    if (!name) {
      throw new AppError('No name provided');
    }

    const championship = await this.championshipRepository.findTeams(name);

    if (!championship) {
      throw new AppError('Championship does not exists');
    }

    if (!Number.isInteger(Math.log2(championship.teams.length))) {
      throw new AppError('Inappropriate number of teams');
    }

    const championshipStarted = await this.championshipRepository.updateStatus(championship.name, 'start');

    let matchNumber = 1;
    let teams: string[] = [];

    championship.teams.forEach((team) => {
      teams.push(team.name);
    });

    while (teams.length > 0) {
      await this.matchRepository.create({
        championshipId: championship.id,
        matchNumber,
        teamA: teams[0],
        teamB: teams[teams.length - 1],
      });

      teams.shift();
      teams.pop();
      matchNumber += 1;
    }

    return championshipStarted;
  }
}
