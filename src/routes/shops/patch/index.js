import { Router } from 'express';

import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';
import editShop from './handler.js';

const router = Router();
const { withShopService, withValidateSchema } = middlewares;

router.patch(
  '/shops/:id',
  withValidateSchema(schema),
  withShopService,
  editShop,
);

export default router;
