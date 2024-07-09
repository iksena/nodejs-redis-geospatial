const loginEmployee = async (req, res, next) => {
  const { logger, employee } = req.app.locals;

  try {
    const response = await employee.login(req.body);

    res.json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default loginEmployee;
