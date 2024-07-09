import { Router } from 'express';

import getShopsById from './[id]/index.js';
import middlewares from '../../../middlewares/index.js';
import getShops from './handler.js';
import schema from './schema.js';

const router = Router();
const { withShopService, withValidateSchema } = middlewares;

router.get(
  '/shops',
  withValidateSchema(schema),
  withShopService,
  getShops,
);

export default [router, getShopsById];
