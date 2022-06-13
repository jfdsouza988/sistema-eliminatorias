import { AppError } from '../../../../shared/errors/AppError';
import { IChampionshipWithTeams } from '../../repositories/IChampionshipRepository';
import { ChampionshipRepositoryInMemory } from '../../repositories/in-memory/ChampionshipRepositoryInMemory';
import { CreateChampionshipUseCase } from '../createChampionship/CreateChampionshipUseCase';
import { RegisterTeamsInChampionshipUseCase } from './RegisterTeamsInChampionshipUseCase';

let createChampionshipUseCase: CreateChampionshipUseCase;
let registerTeamsInChampionshipUseCase: RegisterTeamsInChampionshipUseCase;
let championshipRepositoryInMemory: ChampionshipRepositoryInMemory;

describe('Register teams in championship', () => {
  beforeEach(() => {
    championshipRepositoryInMemory = new ChampionshipRepositoryInMemory();
    createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepositoryInMemory);
    registerTeamsInChampionshipUseCase = new RegisterTeamsInChampionshipUseCase(championshipRepositoryInMemory);
  });

  it('should not be able to register teams in championship that does not exists', async () => {
    expect(async () => {
      const teams = [
        { name: 'Team1', abbreviation: 'TM1' },
        { name: 'Team2', abbreviation: 'TM2' },
      ];

      await registerTeamsInChampionshipUseCase.execute({ championshipName: 'Championship Test', teams });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register teams in in a championship that has already started or has ended', async () => {
    expect(async () => {
      const teams = [
        { name: 'Team1', abbreviation: 'TM1' },
        { name: 'Team2', abbreviation: 'TM2' },
      ];

      const championship = {
        name: 'Championship Test',
        description: 'Championship description Teste',
        award: 1000,
      };

      await createChampionshipUseCase.execute({
        name: championship.name,
        description: championship.description,
        award: championship.award,
      });

      await championshipRepositoryInMemory.updateStatus(championship.name, 'start');

      await registerTeamsInChampionshipUseCase.execute({ championshipName: 'Championship Test', teams });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to register teams a championship', async () => {
    const teams = [
      { name: 'Team1', abbreviation: 'TM1' },
      { name: 'Team2', abbreviation: 'TM2' },
    ];

    const championship = {
      name: 'Championship Test',
      description: 'Championship description Teste',
      award: 1000,
    };

    await createChampionshipUseCase.execute({
      name: championship.name,
      description: championship.description,
      award: championship.award,
    });

    const registerTeams = (await registerTeamsInChampionshipUseCase.execute({
      championshipName: championship.name,
      teams,
    })) as IChampionshipWithTeams;

    expect(registerTeams.teams).toHaveLength(2);
  });
});
