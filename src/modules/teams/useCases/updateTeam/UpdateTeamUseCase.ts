import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ITeamRepository } from '../../repositories/ITeamRepository';

interface IRequest {
  id: string;
  name: string;
  abbreviation: string;
}

@injectable()
export class UpdateTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  async execute({ id, name, abbreviation }: IRequest) {
    if (!id || !name || !abbreviation) {
      throw new AppError('Invalid or not provided parameters');
    }

    const existsTeam = await this.teamRepository.findByName(name);

    if (existsTeam) {
      throw new AppError('Already exists team');
    }

    const updatedTeam = await this.teamRepository.update(id, name, abbreviation);

    return updatedTeam;
  }
}
