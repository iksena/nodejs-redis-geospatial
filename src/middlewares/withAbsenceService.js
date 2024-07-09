import services from '../services/index.js';
import repositories from '../repositories/index.js';

const { AbsenceService } = services;
const { AbsencesRepository } = repositories;

const withAbsenceService = (req, res, next) => {
  const { logger, mongo: { db }, config } = req.app.locals;

  const absenceRepository = new AbsencesRepository({
    logger,
    collection: db.collection(config.resources.db.collections.absences),
    config,
  });

  req.app.locals.absence = new AbsenceService({
    logger,
    absenceRepository,
  });

  return next();
};

export default withAbsenceService;
