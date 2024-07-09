import { Router } from 'express';

import middlewares from '../../../middlewares/index.js';
import deleteShopById from './handler.js';

const router = Router();
const { withShopService } = middlewares;

router.delete(
  '/shops/:id',
  withShopService,
  deleteShopById,
);

export default router;
