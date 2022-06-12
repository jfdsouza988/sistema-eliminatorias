import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StartChampionshipUseCase } from './StartChampionshipUseCase';

export class StartChampionshipController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const startChampionshipUseCase = container.resolve(StartChampionshipUseCase);

    const result = await startChampionshipUseCase.execute(name);

    return response.status(200).json(result);
  }
}
