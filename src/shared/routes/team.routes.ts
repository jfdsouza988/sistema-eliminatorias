import { Router } from 'express';
import { ListAllTeamsController } from '../../modules/teams/useCases/listAllTeams/ListAllTeamsController';

const teamRoutes = Router();

const listAllTeamsController = new ListAllTeamsController();

teamRoutes.get('/all', listAllTeamsController.handle);

export { teamRoutes };
