import Joi from 'joi';

const searchNearby = Joi.object({
  radius: Joi.number()
    .min(1)
    .description('Radius'),
  latitude: Joi.number()
    .min(-85.05112878)
    .max(85.05112878)
    .when('radius', { is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional() })
    .description('Latitude'),
  longitude: Joi.number()
    .when('radius', { is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional() })
    .min(-180)
    .max(180)
    .description('Longitude'),
});

const getShops = { query: searchNearby };

export default getShops;
