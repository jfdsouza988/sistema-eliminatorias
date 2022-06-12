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

    const numberOfTheMatchs = championship.teams.length / 2;
    let matchNumber = 1;

    (async () => {
      do {
        const indexTeamA = Math.floor(Math.random() * championship.teams.length);
        const indexTeamB = Math.floor(Math.random() * championship.teams.length);

        if (championship.teams[indexTeamA].name !== championship.teams[indexTeamB].name) {
          await this.matchRepository.create({
            championshipId: championship.id,
            matchNumber,
            teamA: championship.teams[indexTeamA].name,
            teamB: championship.teams[indexTeamB].name,
          });

          matchNumber += 1;
        }
      } while (matchNumber <= numberOfTheMatchs);
    })();

    return championshipStarted;
  }
}
