import Joi from 'joi';

const employee = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .description('Email'),
  phone: Joi.string()
    .max(20)
    .description('Phone number'),
  name: Joi.string()
    .max(100)
    .description('Name'),
  position: Joi.string()
    .max(100)
    .description('Job position'),
  imageUri: Joi.string()
    .uri()
    .description('Image URI'),
  password: Joi.string()
    .required()
    .description('password'),
});

const postEmployee = { body: employee };

export default postEmployee;
