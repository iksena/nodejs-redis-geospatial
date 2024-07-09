import { Router } from 'express';

import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';
import createShop from './handler.js';

const router = Router();
const { withShopService, withValidateSchema } = middlewares;

router.post(
  '/shops',
  withValidateSchema(schema),
  withShopService,
  createShop,
);

export default router;
