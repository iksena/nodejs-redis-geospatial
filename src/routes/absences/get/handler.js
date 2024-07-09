const getAbsences = async (req, res, next) => {
  const { logger, absence } = req.app.locals;

  try {
    const response = await absence.getAbsences(req.query);

    res.json(response);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default getAbsences;
