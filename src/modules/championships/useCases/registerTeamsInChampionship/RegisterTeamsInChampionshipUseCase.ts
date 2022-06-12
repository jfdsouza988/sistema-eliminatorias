import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

interface ITeam {
  name: string;
  abbreviation: string;
}

interface IRequest {
  championshipName: string;
  teams: ITeam[];
}

@injectable()
export class RegisterTeamsInChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute({ championshipName, teams }: IRequest) {
    let invalidAbbreviationTeam = false;

    teams.forEach((team) => {
      if (team.abbreviation.length > 3) {
        invalidAbbreviationTeam = true;
      }
    });

    if (!championshipName || invalidAbbreviationTeam) {
      throw new AppError('Invalid abbreviation for team or championship name not provided');
    }

    const championshipWithTeams = await this.championshipRepository.registerTeams({ name: championshipName, teams });

    return championshipWithTeams;
  }
}
