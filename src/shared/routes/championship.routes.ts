import { Router } from 'express';
import { ListAllChampionshipsController } from '../../modules/championships/useCases/listAllChampionships/ListAllChampionshipsController';
import { CreateChampionshipController } from '../../modules/championships/useCases/createChampionship/CreateChampionshipController';
import { ListChampionshipController } from '../../modules/championships/useCases/listChampionship/ListChampionshipController';
import { UpdateChampionshipController } from '../../modules/championships/useCases/updateChampionship/UpdateChampionshipController';

const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const listAllChampionshipsController = new ListAllChampionshipsController();
const listChampionshipController = new ListChampionshipController();
const updateChampionshipController = new UpdateChampionshipController();

championshipRoutes.post('/', createChampionshipController.handle);
championshipRoutes.get('/search', listChampionshipController.handle);
championshipRoutes.get('/all', listAllChampionshipsController.handle);
championshipRoutes.patch('/update/:id', updateChampionshipController.handle);

export { championshipRoutes };
