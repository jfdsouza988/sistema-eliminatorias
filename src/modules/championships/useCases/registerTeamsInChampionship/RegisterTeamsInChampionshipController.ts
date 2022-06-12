import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterTeamsInChampionshipUseCase } from './RegisterTeamsInChampionshipUseCase';

export class RegisterTeamsInChampionshipController {
  async handle(request: Request, response: Response) {
    const { championshipName, teams } = request.body;

    const registerTeamsChampionshipUseCase = container.resolve(RegisterTeamsInChampionshipUseCase);

    const result = await registerTeamsChampionshipUseCase.execute({ championshipName, teams });

    return response.status(200).json(result);
  }
}
