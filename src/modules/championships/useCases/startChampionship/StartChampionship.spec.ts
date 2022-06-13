import { ChampionshipStatus } from '@prisma/client';
import { MatchRepositoryInMemory } from '../../../matchs/repositories/in-memory/MatchRepositoryInMemory';
import { ChampionshipRepositoryInMemory } from '../../repositories/in-memory/ChampionshipRepositoryInMemory';
import { CreateChampionshipUseCase } from '../createChampionship/CreateChampionshipUseCase';
import { StartChampionshipUseCase } from './StartChampionshipUseCase';
import { RegisterTeamsInChampionshipUseCase } from '../registerTeamsInChampionship/RegisterTeamsInChampionshipUseCase';
import { AppError } from '../../../../shared/errors/AppError';

let createChampionshipUseCase: CreateChampionshipUseCase;
let registerTeamsInChampionshipUseCase: RegisterTeamsInChampionshipUseCase;
let championshipRepositoryInMemory: ChampionshipRepositoryInMemory;
let matchRepositoryInMemory: MatchRepositoryInMemory;
let startChampionshipUseCase: StartChampionshipUseCase;

describe('Start a Championship', () => {
  beforeEach(() => {
    championshipRepositoryInMemory = new ChampionshipRepositoryInMemory();
    matchRepositoryInMemory = new MatchRepositoryInMemory();
    createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepositoryInMemory);
    startChampionshipUseCase = new StartChampionshipUseCase(championshipRepositoryInMemory, matchRepositoryInMemory);
    registerTeamsInChampionshipUseCase = new RegisterTeamsInChampionshipUseCase(championshipRepositoryInMemory);
  });

  it('should not be able to start championship that does not exists', async () => {
    expect(async () => {
      await startChampionshipUseCase.execute('Championship Test');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start championship with inappropriate number of teams', async () => {
    expect(async () => {
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

      await startChampionshipUseCase.execute('Championship Test');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to start a championship', async () => {
    const championship = {
      name: 'Championship Test',
      description: 'Championship description Teste',
      award: 1000,
    };

    const teams = [
      { name: 'Team1', abbreviation: 'TM1' },
      { name: 'Team2', abbreviation: 'TM2' },
    ];

    await createChampionshipUseCase.execute({
      name: championship.name,
      description: championship.description,
      award: championship.award,
    });

    await registerTeamsInChampionshipUseCase.execute({ championshipName: championship.name, teams });

    const championshipStarted = await startChampionshipUseCase.execute(championship.name);

    expect(championshipStarted.status).toBe(ChampionshipStatus.INITIATED);
  });
});
