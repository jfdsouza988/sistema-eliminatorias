import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTeamUseCase } from './UpdateTeamUseCase';

export class UpdateTeamController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, abbreviation } = request.body;

    const updateTeamUseCase = container.resolve(UpdateTeamUseCase);

    const result = await updateTeamUseCase.execute({ id, name, abbreviation });

    return response.status(200).json(result);
  }
}
