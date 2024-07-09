import Joi from 'joi';

const employeeLogin = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .description('Email'),
  password: Joi.string()
    .required()
    .description('Phone number'),
});

const postEmployee = { body: employeeLogin };

export default postEmployee;
