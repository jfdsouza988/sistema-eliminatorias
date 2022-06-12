import { inject, injectable } from 'tsyringe';
import { IChampionshipRepository } from '../../../championships/repositories/IChampionshipRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { ITeamRepository } from '../../repositories/ITeamRepository';

@injectable()
export class DeleteTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute(name: string) {
    if (!name) {
      throw new AppError('No name provided for delete team');
    }

    const team = await this.teamRepository.findByName(name);

    if (!team) {
      throw new AppError('Team does not exists');
    }

    await Promise.all(
      team.championships.map(async (championship) => {
        if (championship.status === 'PENDING') {
          await this.championshipRepository.deleteTeam(championship.id, team.name);
        }
      }),
    );

    const deleteTeam = await this.teamRepository.delete(name);

    return deleteTeam;
  }
}
