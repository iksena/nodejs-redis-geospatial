import { Router } from 'express';

import getEmployees from './handler.js';
import middlewares from '../../../middlewares/index.js';

const router = Router();
const { withShopService } = middlewares;

router.get(
  '/employees',
  withShopService,
  getEmployees,
);

export default router;
