import { Router } from 'express';

import editEmployee from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withEmployeeService, withValidateSchema } = middlewares;

router.patch(
  '/employees',
  withValidateSchema(schema),
  withEmployeeService,
  editEmployee,
);

export default router;
