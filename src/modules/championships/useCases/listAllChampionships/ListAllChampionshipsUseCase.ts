import { inject, injectable } from 'tsyringe';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class ListAllChampionshipsUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute() {
    const allChampionships = await this.championshipRepository.findAll();

    return allChampionships;
  }
}
