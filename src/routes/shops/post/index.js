import { Router } from 'express';

import createEmployee from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withShopService, withValidateSchema } = middlewares;

router.post(
  '/employees',
  withValidateSchema(schema),
  withShopService,
  createEmployee,
);

export default router;
