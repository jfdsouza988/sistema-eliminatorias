import { Router } from 'express';
import { ListChampionshipTeamsController } from '../../modules/championships/useCases/listChampionshipTeams/ListChampionshipTeamsController';
import { ListAllChampionshipsController } from '../../modules/championships/useCases/listAllChampionships/ListAllChampionshipsController';
import { CreateChampionshipController } from '../../modules/championships/useCases/createChampionship/CreateChampionshipController';
import { ListChampionshipController } from '../../modules/championships/useCases/listChampionship/ListChampionshipController';
import { UpdateChampionshipController } from '../../modules/championships/useCases/updateChampionship/UpdateChampionshipController';
import { RegisterTeamsInChampionshipController } from '../../modules/championships/useCases/registerTeamsInChampionship/RegisterTeamsInChampionshipController';
import { StartChampionshipController } from '../../modules/championships/useCases/startChampionship/StartChampionshipController';

const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const listAllChampionshipsController = new ListAllChampionshipsController();
const listChampionshipController = new ListChampionshipController();
const updateChampionshipController = new UpdateChampionshipController();
const registerTeamsInChampionshipController = new RegisterTeamsInChampionshipController();
const listChampionshipTeamsController = new ListChampionshipTeamsController();
const startChampionshipController = new StartChampionshipController();

championshipRoutes.post('/', createChampionshipController.handle);
championshipRoutes.get('/search', listChampionshipController.handle);
championshipRoutes.get('/all', listAllChampionshipsController.handle);
championshipRoutes.patch('/update/:id', updateChampionshipController.handle);
championshipRoutes.post('/register-teams', registerTeamsInChampionshipController.handle);
championshipRoutes.get('/:name/teams', listChampionshipTeamsController.handle);
championshipRoutes.post('/start', startChampionshipController.handle);

export { championshipRoutes };
