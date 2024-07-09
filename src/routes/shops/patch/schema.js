import Joi from 'joi';

const shop = Joi.object({
  name: Joi.string()
    .max(100)
    .description('Name'),
  latitude: Joi.number()
    .description('Latitude'),
  longitude: Joi.number()
    .description('Longitude'),
});

const patchShop = { body: shop };

export default patchShop;
