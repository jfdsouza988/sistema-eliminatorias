import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllTeamsUseCase } from './ListAllTeamsUseCase';

export class ListAllTeamsController {
  async handle(request: Request, response: Response) {
    const listAllTeamsUseCase = container.resolve(ListAllTeamsUseCase);

    const result = await listAllTeamsUseCase.execute();

    return response.status(200).json(result);
  }
}
