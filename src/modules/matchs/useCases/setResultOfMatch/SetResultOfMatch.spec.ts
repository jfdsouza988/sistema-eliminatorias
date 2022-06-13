import { Match, MatchStatus } from '@prisma/client';
import { MatchRepositoryInMemory } from '../../repositories/in-memory/MatchRepositoryInMemory';
import { ChampionshipRepositoryInMemory } from '../../../championships/repositories/in-memory/ChampionshipRepositoryInMemory';
import { CreateChampionshipUseCase } from '../../../championships/useCases/createChampionship/CreateChampionshipUseCase';
import { RegisterTeamsInChampionshipUseCase } from '../../../championships/useCases/registerTeamsInChampionship/RegisterTeamsInChampionshipUseCase';
import { AppError } from '../../../../shared/errors/AppError';
import { StartChampionshipUseCase } from '../../../championships/useCases/startChampionship/StartChampionshipUseCase';
import { SetResultOfMatchUseCase } from './SetResultOfMatchUseCase';

let createChampionshipUseCase: CreateChampionshipUseCase;
let registerTeamsInChampionshipUseCase: RegisterTeamsInChampionshipUseCase;
let championshipRepositoryInMemory: ChampionshipRepositoryInMemory;
let matchRepositoryInMemory: MatchRepositoryInMemory;
let startChampionshipUseCase: StartChampionshipUseCase;
let setResultOfMatch: SetResultOfMatchUseCase;

describe('Set result of match', () => {
  beforeEach(() => {
    championshipRepositoryInMemory = new ChampionshipRepositoryInMemory();
    matchRepositoryInMemory = new MatchRepositoryInMemory();
    createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepositoryInMemory);
    setResultOfMatch = new SetResultOfMatchUseCase(matchRepositoryInMemory, championshipRepositoryInMemory);
    startChampionshipUseCase = new StartChampionshipUseCase(championshipRepositoryInMemory, matchRepositoryInMemory);

    registerTeamsInChampionshipUseCase = new RegisterTeamsInChampionshipUseCase(championshipRepositoryInMemory);
  });

  it('should not be able to set the result of match with invalid values for result', async () => {
    expect(async () => {
      const championship = {
        name: 'Championship Test',
        description: 'Championship description Teste',
        award: 1000,
      };

      const teams = [
        { name: 'Team1', abbreviation: 'TM1' },
        { name: 'Team2', abbreviation: 'TM2' },
      ];

      const championshipCreated = await createChampionshipUseCase.execute({
        name: championship.name,
        description: championship.description,
        award: championship.award,
      });

      await registerTeamsInChampionshipUseCase.execute({ championshipName: championship.name, teams });

      await startChampionshipUseCase.execute(championship.name);

      const matchs = await matchRepositoryInMemory.findMatchsInProgressByChampionship(championshipCreated.id);

      await setResultOfMatch.execute({ id: matchs[0].id, teamA: 2.0, teamB: 1.2 });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to set the result of match', async () => {
    const championship = {
      name: 'Championship Test',
      description: 'Championship description Teste',
      award: 1000,
    };

    const teams = [
      { name: 'Team1', abbreviation: 'TM1' },
      { name: 'Team2', abbreviation: 'TM2' },
      { name: 'Team3', abbreviation: 'TM3' },
      { name: 'Team4', abbreviation: 'TM4' },
    ];

    const championshipCreated = await createChampionshipUseCase.execute({
      name: championship.name,
      description: championship.description,
      award: championship.award,
    });

    await registerTeamsInChampionshipUseCase.execute({ championshipName: championship.name, teams });

    await startChampionshipUseCase.execute(championship.name);

    const matchs = await matchRepositoryInMemory.findMatchsInProgressByChampionship(championshipCreated.id);

    const updatedMatch = (await setResultOfMatch.execute({ id: matchs[0].id, teamA: 2, teamB: 1 })) as Match;

    expect(updatedMatch.status).toBe(MatchStatus.FINISHED);
  });
});
