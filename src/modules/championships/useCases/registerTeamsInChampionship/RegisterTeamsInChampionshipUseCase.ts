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
    const championship = await this.championshipRepository.findByName(championshipName);

    if (!championship) {
      throw new AppError('Championship does not exists');
    }

    if (championship.status === 'INITIATED' || championship.status === 'FINISHED') {
      throw new AppError('Championship already started or finished');
    }

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
