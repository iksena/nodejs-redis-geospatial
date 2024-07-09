import services from '../services/index.js';
import repositories from '../repositories/index.js';

const { EmployeeService } = services;
const { EmployeesRepository } = repositories;

const withEmployeeService = (req, res, next) => {
  const { logger, mongo: { db }, config } = req.app.locals;

  const employeesRepository = new EmployeesRepository({
    logger,
    collection: db.collection(config.resources.db.collections.employees),
    config,
  });

  req.app.locals.employee = new EmployeeService({
    logger,
    employeesRepository,
  });

  return next();
};

export default withEmployeeService;
