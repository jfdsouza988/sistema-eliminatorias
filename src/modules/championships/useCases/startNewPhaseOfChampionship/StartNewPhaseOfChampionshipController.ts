import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StartNewPhaseOfChampionshipUseCase } from './StartNewPhaseOfChampionshipUseCase';

export class StartNewPhaseOfChampionshipController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const startNewPhaseOfChampionshipUseCase = container.resolve(StartNewPhaseOfChampionshipUseCase);

    const result = await startNewPhaseOfChampionshipUseCase.execute(name);

    return response.status(200).json(result);
  }
}
