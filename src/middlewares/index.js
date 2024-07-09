import errorMiddleware from './error.js';
import notFoundMiddleware from './notFound.js';
import withAbsenceMiddleware from './withAbsenceService.js';
import withEmployeeService from './withEmployeeService.js';
import withValidateSchema from './withValidateSchema.js';

export default {
  errorMiddleware,
  notFoundMiddleware,
  withAbsenceMiddleware,
  withEmployeeService,
  withValidateSchema,
};
