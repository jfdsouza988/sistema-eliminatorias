import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateChampionshipUseCase } from './CreateChampionshipUseCase';

export class CreateChampionshipController {
  async handle(request: Request, response: Response) {
    const { name, description, award } = request.body;

    const createChampionshipUseCase = container.resolve(CreateChampionshipUseCase);

    const result = await createChampionshipUseCase.execute({
      name,
      description,
      award,
    });

    return response.status(201).json(result);
  }
}
