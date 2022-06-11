import { Router } from 'express';
import { championshipRoutes } from './championship.routes';

const router = Router();

router.use('/championship', championshipRoutes);

export { router };
