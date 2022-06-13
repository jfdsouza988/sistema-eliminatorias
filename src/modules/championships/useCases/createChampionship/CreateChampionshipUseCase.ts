import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateChampionshipDTO } from '../../dtos/ICreateChampionshipDTO';

import { IChampionshipRepository } from '../../repositories/IChampionshipRepository';

@injectable()
export class CreateChampionshipUseCase {
  constructor(
    @inject('ChampionshipRepository')
    private championshipRepository: IChampionshipRepository,
  ) {}

  async execute({ name, description, award }: ICreateChampionshipDTO) {
    if (!name || !description || !award) {
      throw new AppError('Invalid or not provided parameters');
    }

    const championshipExists = await this.championshipRepository.findByName(name);

    if (championshipExists) {
      throw new AppError('Championship already exists');
    }

    const championship = await this.championshipRepository.create({
      name,
      description,
      award,
    });

    return championship;
  }
}
