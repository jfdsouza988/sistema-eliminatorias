import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTeamUseCase } from './ListTeamUseCase';

export class ListTeamController {
  async handle(request: Request, response: Response) {
    const name = request.query.name as string;

    const listTeamUseCase = container.resolve(ListTeamUseCase);

    const result = await listTeamUseCase.execute(name);

    return response.status(200).json(result);
  }
}
