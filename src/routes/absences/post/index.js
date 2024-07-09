import { Router } from 'express';

import postAbsence from './handler.js';
import middlewares from '../../../middlewares/index.js';
import schema from './schema.js';

const router = Router();
const { withAbsenceMiddleware, withValidateSchema } = middlewares;

router.post(
  '/absences',
  withValidateSchema(schema),
  withAbsenceMiddleware,
  postAbsence,
);

export default router;
