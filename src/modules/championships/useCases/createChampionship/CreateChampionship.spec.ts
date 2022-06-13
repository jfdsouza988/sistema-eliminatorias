import { ChampionshipRepositoryInMemory } from '../../repositories/in-memory/ChampionshipRepositoryInMemory';
import { CreateChampionshipUseCase } from './CreateChampionshipUseCase';

let createChampionshipUseCase: CreateChampionshipUseCase;
let championshipRepositoryInMemory: ChampionshipRepositoryInMemory;

describe('Create Championship', () => {
  beforeEach(() => {
    championshipRepositoryInMemory = new ChampionshipRepositoryInMemory();
    createChampionshipUseCase = new CreateChampionshipUseCase(championshipRepositoryInMemory);
  });

  it('should be able to create a new championship', async () => {
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

    const championshipCreated = await championshipRepositoryInMemory.findByName(championship.name);

    expect(championshipCreated).toHaveProperty('id');
  });
});
