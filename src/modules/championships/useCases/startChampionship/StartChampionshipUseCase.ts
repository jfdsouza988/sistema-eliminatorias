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

    await this.championshipRepository.updateStatus(championship.name, 'start');

    // gerar primeira rodada de jogos
    let teams: string[] = [];
    let matchNumber = 1;

    championship.teams.forEach((team) => {
      teams.push(team.name);
    });

    (async () => {
      while (teams.length > 0) {
        const indexTeamA = Math.floor(Math.random() * championship.teams.length);
        const indexTeamB = Math.floor(Math.random() * championship.teams.length);

        if (championship.teams[indexTeamA].name !== championship.teams[indexTeamB].name) {
          await this.matchRepository.create({
            championshipId: championship.id,
            matchNumber,
            teamA: championship.teams[indexTeamA].name,
            teamB: championship.teams[indexTeamB].name,
          });

          teams = teams.filter((team) => team !== championship.teams[indexTeamA].name);
          teams = teams.filter((team) => team !== championship.teams[indexTeamB].name);

          matchNumber += 1;
        }
      }
    })();

    const championshipStarted = await this.championshipRepository.findByName(name);

    return championshipStarted;
  }
}
