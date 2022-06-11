import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateChampionshipUseCase } from './UpdateChampionshipUseCase';

export class UpdateChampionshipController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, award } = request.body;

    const updateChampionshipUseCase = container.resolve(UpdateChampionshipUseCase);

    const result = await updateChampionshipUseCase.execute({ id, name, description, award });

    return response.status(200).json(result);
  }
}
