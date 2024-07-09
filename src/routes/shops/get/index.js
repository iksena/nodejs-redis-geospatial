import { Router } from 'express';

import getEmployees from './handler.js';
import middlewares from '../../../middlewares/index.js';

const router = Router();
const { withEmployeeService } = middlewares;

router.get(
  '/employees',
  withEmployeeService,
  getEmployees,
);

export default router;
