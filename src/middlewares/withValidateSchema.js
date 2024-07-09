import HttpErrors from 'http-errors';

/**
 * validating request
 *
 * @param {object} schema - schema of request body
 * @returns {promise} return to next function
 */
const withValidateSchema = (schema) => (req, res, next) => {
  const payloads = Object.keys(schema);

  const result = payloads.reduce((errorMessage, payload) => {
    const validationResult = schema[`${payload}`].validate(req[`${payload}`]);

    if (validationResult.error) {
      return new HttpErrors.BadRequest(validationResult.error.message);
    }

    return errorMessage;
  }, null);

  return next(result);
};

export default withValidateSchema;
