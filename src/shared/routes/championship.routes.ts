import { Router } from 'express';
import { ListAllChampionshipsController } from '../../modules/championships/useCases/listAllChampionships/ListAllChampionshipsController';
import { CreateChampionshipController } from '../../modules/championships/useCases/createChampionship/CreateChampionshipController';
import { ListChampionshipController } from '../../modules/championships/useCases/listChampionship/ListChampionshipController';
import { UpdateChampionshipController } from '../../modules/championships/useCases/updateChampionship/UpdateChampionshipController';
import { RegisterTeamsInChampionshipController } from '../../modules/championships/useCases/registerTeamsInChampionship/RegisterTeamsInChampionshipController';

const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const listAllChampionshipsController = new ListAllChampionshipsController();
const listChampionshipController = new ListChampionshipController();
const updateChampionshipController = new UpdateChampionshipController();
const registerTeamsInChampionshipController = new RegisterTeamsInChampionshipController();

championshipRoutes.post('/', createChampionshipController.handle);
championshipRoutes.get('/search', listChampionshipController.handle);
championshipRoutes.get('/all', listAllChampionshipsController.handle);
championshipRoutes.patch('/update/:id', updateChampionshipController.handle);
championshipRoutes.post('/register-teams', registerTeamsInChampionshipController.handle);

export { championshipRoutes };
