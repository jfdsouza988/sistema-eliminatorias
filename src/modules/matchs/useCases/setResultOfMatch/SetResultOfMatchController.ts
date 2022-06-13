import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SetResultOfMatchUseCase } from './SetResultOfMatchUseCase';

export class SetResultOfMatchController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { teamA, teamB } = request.body;

    const setResultOfMatchUseCase = container.resolve(SetResultOfMatchUseCase);

    const result = await setResultOfMatchUseCase.execute({ id, teamA, teamB });

    return response.status(200).json(result);
  }
}
