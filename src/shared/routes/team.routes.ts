import { Router } from 'express';
import { ListTeamController } from '../../modules/teams/useCases/listTeam/ListTeamController';
import { ListAllTeamsController } from '../../modules/teams/useCases/listAllTeams/ListAllTeamsController';

const teamRoutes = Router();

const listAllTeamsController = new ListAllTeamsController();
const lisTeamController = new ListTeamController();

teamRoutes.get('/all', listAllTeamsController.handle);
teamRoutes.get('/search', lisTeamController.handle);

export { teamRoutes };
