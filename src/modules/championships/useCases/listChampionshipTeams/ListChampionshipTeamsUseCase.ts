import { inject, injectable } from 'tsyringe';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class ListChampionshipTeamsUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute(name: string) {
    const championshipTeams = await this.championshipRepository.findTeams(name);

    return championshipTeams;
  }
}
