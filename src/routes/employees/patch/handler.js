const editEmployee = async (req, res, next) => {
  const { logger, employee } = req.app.locals;

  try {
    const response = await employee.editEmployee(req.body);

    res.status(200).json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default editEmployee;
