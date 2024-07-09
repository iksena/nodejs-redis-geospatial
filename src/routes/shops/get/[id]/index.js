import { Router } from 'express';

import middlewares from '../../../../middlewares/index.js';
import getShopsById from './handler.js';

const router = Router();
const { withShopService } = middlewares;

router.get(
  '/shops/:id',
  withShopService,
  getShopsById,
);

export default router;
