import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListChampionshipMatchsUseCase } from './ListChampionshipMatchsUseCase';

export class ListChampionshipMatchsController {
  async handle(request: Request, response: Response) {
    const name = request.query.name as string;

    const listChampionshipMatchsUseCase = container.resolve(ListChampionshipMatchsUseCase);

    const result = await listChampionshipMatchsUseCase.execute(name);

    return response.status(200).json(result);
  }
}
