import { MatchRepositoryInMemory } from '../../../matchs/repositories/in-memory/MatchRepositoryInMemory';
import { ChampionshipRepositoryInMemory } from '../../repositories/in-memory/ChampionshipRepositoryInMemory';
import { CreateChampionshipUseCase } from '../createChampionship/CreateChampionshipUseCase';
import { RegisterTeamsInChampionshipUseCase } from '../registerTeamsInChampionship/RegisterTeamsInChampionshipUseCase';
import { AppError } from '../../../../shared/errors/AppError';
import { StartNewPhaseOfChampionshipUseCase } from './StartNewPhaseOfChampionshipUseCase';
import { StartChampionshipUseCase } from '../startChampionship/StartChampionshipUseCase';
import { SetResultOfMatchUseCase } from '../../../matchs/useCases/setResultOfMatch/SetResultOfMatchUseCase';

let createChampionshipUseCase: CreateChampionshipUseCase;
let registerTeamsInChampionshipUseCase: RegisterTeamsInChampionshipUseCase;
let championshipRepositoryInMemory: ChampionshipRepositoryInMemory;
let matchRepositoryInMemory: MatchRepositoryInMemory;
let startNewPhaseOfChampionshipUseCase: StartNewPhaseOfChampionshipUseCase;
let startChampionshipUseCase: StartChampionshipUseCase;
let setResultOfMatch: SetResultOfMatchUseCase;

describe('Start a new phase of Championship', () => {
  beforeEach(() => {
    championshipRepositoryInMemory = new ChampionshipRepositoryInMemory();
    matchRepositoryInMemory = new MatchRepositoryInMemory();
    createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepositoryInMemory);
    setResultOfMatch = new SetResultOfMatchUseCase(matchRepositoryInMemory, championshipRepositoryInMemory);
    startChampionshipUseCase = new StartChampionshipUseCase(championshipRepositoryInMemory, matchRepositoryInMemory);
    startNewPhaseOfChampionshipUseCase = new StartNewPhaseOfChampionshipUseCase(
      championshipRepositoryInMemory,
      matchRepositoryInMemory,
    );
    registerTeamsInChampionshipUseCase = new RegisterTeamsInChampionshipUseCase(championshipRepositoryInMemory);
  });

  it('should not be able to start new phase of championship that does not exists', async () => {
    expect(async () => {
      await startNewPhaseOfChampionshipUseCase.execute('Championship Test');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start new phase of championship has already ended', async () => {
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

      await championshipRepositoryInMemory.updateStatus(championship.name, 'finish');

      await startNewPhaseOfChampionshipUseCase.execute(championship.name);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to start new phase of championship that does exists matchs not been finished yet', async () => {
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

      await createChampionshipUseCase.execute({
        name: championship.name,
        description: championship.description,
        award: championship.award,
      });

      await registerTeamsInChampionshipUseCase.execute({ championshipName: championship.name, teams });

      await startChampionshipUseCase.execute(championship.name);

      await startNewPhaseOfChampionshipUseCase.execute(championship.name);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to start new phase of championship', async () => {
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

      await setResultOfMatch.execute({ id: matchs[0].id, teamA: 2, teamB: 1 });

      await startNewPhaseOfChampionshipUseCase.execute(championship.name);
    }).rejects.toBeInstanceOf(AppError);
  });
});
