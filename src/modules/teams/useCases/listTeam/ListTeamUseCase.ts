import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ITeamRepository } from '../../repositories/ITeamRepository';

@injectable()
export class ListTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  async execute(name: string) {
    if (!name) {
      throw new AppError('No name provided');
    }

    const team = await this.teamRepository.findByName(name);

    return team;
  }
}
