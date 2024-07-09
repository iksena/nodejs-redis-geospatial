import Joi from 'joi';

const shop = Joi.object({
  name: Joi.string()
    .required()
    .description('Name'),
  latitude: Joi.number()
    .required()
    .description('Latitude'),
  longitude: Joi.number()
    .required()
    .description('Longitude'),
});

const postShop = { body: shop };

export default postShop;
