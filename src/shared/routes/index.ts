import { Router } from 'express';
import { championshipRoutes } from './championship.routes';
import { teamRoutes } from './team.routes';

const router = Router();

router.use('/championship', championshipRoutes);
router.use('/team', teamRoutes);

export { router };
