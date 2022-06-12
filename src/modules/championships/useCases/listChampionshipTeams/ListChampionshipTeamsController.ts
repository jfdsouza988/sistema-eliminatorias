import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListChampionshipTeamsUseCase } from './ListChampionshipTeamsUseCase';

export class ListChampionshipTeamsController {
  async handle(request: Request, response: Response) {
    const { name } = request.params;

    const listChampionshipTeamsUseCase = container.resolve(ListChampionshipTeamsUseCase);

    const result = await listChampionshipTeamsUseCase.execute(name);

    return response.status(200).json(result);
  }
}
