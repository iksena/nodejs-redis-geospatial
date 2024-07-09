import { Router } from 'express';

import login from './handler.js';
import middlewares from '../../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withEmployeeService, withValidateSchema } = middlewares;

router.post(
  '/employees/login',
  withValidateSchema(schema),
  withEmployeeService,
  login,
);

export default router;
