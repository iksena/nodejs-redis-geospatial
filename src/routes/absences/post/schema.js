import Joi from 'joi';

import constants from '../../../constants/index.js';

const absence = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .description('Email'),
  time: Joi.date()
    .iso()
    .required()
    .description('Time'),
  status: Joi.valid(...Object.values(constants.ABSENCE_STATUS))
    .description('Status')
    .required(),
});

const postAbsence = { body: absence };

export default postAbsence;
