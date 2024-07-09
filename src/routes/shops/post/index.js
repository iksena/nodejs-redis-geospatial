import { Router } from 'express';

import createEmployee from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withEmployeeService, withValidateSchema } = middlewares;

router.post(
  '/employees',
  withValidateSchema(schema),
  withEmployeeService,
  createEmployee,
);

export default router;
