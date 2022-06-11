import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllChampionshipsUseCase } from './ListAllChampionshipsUseCase';

export class ListAllChampionshipsController {
  async handle(request: Request, response: Response) {
    const listAllChampionshipsUseCase = container.resolve(ListAllChampionshipsUseCase);

    const result = await listAllChampionshipsUseCase.execute();

    return response.status(200).json(result);
  }
}
