import { Router } from 'express';

import getShopsById from './[id]/index.js';
import middlewares from '../../../middlewares/index.js';
import getShops from './handler.js';

const router = Router();
const { withShopService } = middlewares;

router.get(
  '/shops',
  withShopService,
  getShops,
);

export default [router, getShopsById];
