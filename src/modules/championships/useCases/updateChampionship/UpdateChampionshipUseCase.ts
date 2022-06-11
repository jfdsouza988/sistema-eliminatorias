import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
  award: number;
}

@injectable()
export class UpdateChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute({ id, name, description, award }: IRequest) {
    if (!id || !name || !description || !award) {
      throw new AppError('Invalid or not provided parameters');
    }

    const championship = await this.championshipRepository.update(id, name, description, award);

    return championship;
  }
}
