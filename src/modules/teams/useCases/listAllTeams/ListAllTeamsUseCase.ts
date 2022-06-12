import { inject, injectable } from 'tsyringe';
import { ITeamRepository } from '../../repositories/ITeamRepository';

@injectable()
export class ListAllTeamsUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository,
  ) {}

  async execute() {
    const allTeams = await this.teamRepository.findAll();

    return allTeams;
  }
}
