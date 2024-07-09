const postAbsence = async (req, res, next) => {
  const { logger, absence } = req.app.locals;

  try {
    const response = await absence.saveAbsence(req.body);

    res.status(201).json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default postAbsence;
