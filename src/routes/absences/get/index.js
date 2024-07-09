import { Router } from 'express';

import getAbsences from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withAbsenceMiddleware, withValidateSchema } = middlewares;

router.get(
  '/absences',
  withValidateSchema(schema),
  withAbsenceMiddleware,
  getAbsences,
);

export default router;
