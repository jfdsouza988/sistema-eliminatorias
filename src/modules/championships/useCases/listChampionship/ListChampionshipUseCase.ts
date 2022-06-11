import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class ListChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute(name: string) {
    if (!name) {
      throw new AppError('No name provided');
    }
    const championship = await this.championshipRepository.findByName(name);

    return championship;
  }
}
