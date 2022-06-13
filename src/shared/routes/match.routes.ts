import { Router } from 'express';
import { SetResultOfMatchController } from '../../modules/matchs/useCases/setResultOfMatch/SetResultOfMatchController';

const matchRoutes = Router();

const setResultOfMatchController = new SetResultOfMatchController();

matchRoutes.post('/:id/set-result', setResultOfMatchController.handle);

export { matchRoutes };
