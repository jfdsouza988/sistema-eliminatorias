import { container } from 'tsyringe';

import { ChampionshipRepository } from '../../modules/championships/repositories/implementations/ChampionshipRepository';
import { IChampionshipRepository } from '../../modules/championships/repositories/IChampionshipRepository';

container.registerSingleton<IChampionshipRepository>('ChampionshipRepository', ChampionshipRepository);
