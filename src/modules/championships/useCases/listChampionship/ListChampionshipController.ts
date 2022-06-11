import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListChampionshipUseCase } from './ListChampionshipUseCase';

export class ListChampionshipController {
  async handle(request: Request, response: Response) {
    const name = request.query.name as string;

    const listChampionshipUseCase = container.resolve(ListChampionshipUseCase);

    const result = await listChampionshipUseCase.execute(name);

    return response.status(200).json(result);
  }
}
