import moment from 'moment';
/**
 *  Represents the connection to absences collection in mongoDb
 */
class AbsencesRepository {
  /**
   * Initialize AbsencesRepository
   *
   * @param {object} opts - options
   * @property {object} opts.logger - logger object
   * @property {object} opts.collection - absence collection object
   * @property {object} opts.config - configuration object
   * @returns {void}
   */
  constructor(opts) {
    Object.assign(this, opts);
  }

  /**
   * Get absences by filter
   * @param {Object} filter - absence filter
   * @returns list of absencs
   */
  async get(filter) {
    const {
      startDate,
      endDate,
      email,
    } = filter;

    const query = {
      $match: {
        ...!!email && { email },
        ...(!!startDate || !!endDate) && {
          time: {
            ...!!startDate && { $gte: moment(startDate).startOf('day').toDate() },
            ...!!endDate && { $lte: moment(endDate).endOf('day').toDate() },
          },
        },
      },
    };
    const sort = { $sort: { time: -1 } };
    this.logger.info('[DB] Get user absences', { query, sort });

    return this.collection.aggregate([query, sort]).toArray();
  }

  /**
   * Find an absence by email and date
   * @param {String} email - employee email
   * @param {String} date - employee absence date
   * @returns {Object} absence object
   */
  async findOne(email, date) {
    this.logger.info('[DB] Find an absence', { email, date });

    return this.collection.findOne({ email, date });
  }

  /**
   * Insert or update an absence
   *
   * @param {object} payload - user absence
   * @returns {promise<object>} employee of the user
   */
  async saveOrUpdate(payload) {
    this.logger.info('[DB] Insert or update absence', payload);

    const { email, date } = payload;

    const query = { email, date };
    const setter = {
      $set: payload,
      $currentDate: { modifiedAt: true },
      $setOnInsert: { createdAt: new Date() },
    };
    const options = {
      upsert: true,
      returnDocument: 'after',
    };

    const { value } = await this.collection.findOneAndUpdate(query, setter, options);

    return value;
  }
}

export default AbsencesRepository;
