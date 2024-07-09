import Joi from 'joi';

const absenceFilter = Joi.object({
  email: Joi.string()
    .email()
    .description('Email'),
  startDate: Joi.date()
    .iso()
    .description('Start date'),
  endDate: Joi.date()
    .iso()
    .description('Start date'),
});

const postAbsence = { query: absenceFilter };

export default postAbsence;
