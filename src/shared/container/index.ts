import { container } from 'tsyringe';

import { MatchRepository } from '../../modules/matchs/repositories/implementations/MatchRepository';
import { IMatchRepository } from '../../modules/matchs/repositories/IMatchRepository';
import { TeamRepository } from '../../modules/teams/repositories/implementations/TeamRepository';
import { ITeamRepository } from '../../modules/teams/repositories/ITeamRepository';
import { ChampionshipRepository } from '../../modules/championships/repositories/implementations/ChampionshipRepository';
import { IChampionshipRepository } from '../../modules/championships/repositories/IChampionshipRepository';

container.registerSingleton<IChampionshipRepository>('ChampionshipRepository', ChampionshipRepository);

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository);

container.registerSingleton<IMatchRepository>('MatchRepository', MatchRepository);
