import { Router } from 'express';
import { championshipRoutes } from './championship.routes';
import { matchRoutes } from './match.routes';
import { teamRoutes } from './team.routes';

const router = Router();

router.use('/championship', championshipRoutes);
router.use('/team', teamRoutes);
router.use('/match', matchRoutes);

export { router };
