import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTeamUseCase } from './DeleteTeamUseCase';

export class DeleteTeamController {
  async handle(request: Request, response: Response) {
    const { name } = request.params;

    const deleteTeamUseCase = container.resolve(DeleteTeamUseCase);

    const result = await deleteTeamUseCase.execute(name);

    return response.status(200).json(result);
  }
}
