import { Router } from 'express';

import editEmployee from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withShopService, withValidateSchema } = middlewares;

router.patch(
  '/employees',
  withValidateSchema(schema),
  withShopService,
  editEmployee,
);

export default router;
