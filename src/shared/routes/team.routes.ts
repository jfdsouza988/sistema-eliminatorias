import { Router } from 'express';
import { DeleteTeamController } from '../../modules/teams/useCases/deleteTeam/DeleteTeamController';
import { ListTeamController } from '../../modules/teams/useCases/listTeam/ListTeamController';
import { ListAllTeamsController } from '../../modules/teams/useCases/listAllTeams/ListAllTeamsController';
import { UpdateTeamController } from '../../modules/teams/useCases/updateTeam/UpdateTeamController';

const teamRoutes = Router();

const listAllTeamsController = new ListAllTeamsController();
const lisTeamController = new ListTeamController();
const updateTeamController = new UpdateTeamController();
const deleteTeamController = new DeleteTeamController();

teamRoutes.get('/all', listAllTeamsController.handle);
teamRoutes.get('/search', lisTeamController.handle);
teamRoutes.patch('/update/:id', updateTeamController.handle);
teamRoutes.delete('/delete/:name', deleteTeamController.handle);

export { teamRoutes };
