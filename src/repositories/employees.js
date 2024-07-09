/**
 *  Represents the connection to employees collection in mongoDb
 */
class EmployeesRepository {
  /**
   * Initialize EmployeesRepository
   *
   * @param {object} opts - options
   * @property {object} opts.logger - logger object
   * @property {object} opts.collection - employees collection object
   * @property {object} opts.config - configuration object
   * @returns {void}
   */
  constructor(opts) {
    Object.assign(this, opts);
  }

  /**
   * Find all employees
   * @returns {Array<Object>} list of employees
   */
  async findAll() {
    this.logger.info('[DB] Get all employees');

    return this.collection.find({}).toArray();
  }

  /**
   * Find an employee by email
   * @param {String} email - employee email
   * @returns {Object} employee object
   */
  async findOneByEmail(email) {
    this.logger.info('[DB] Find an employee', { email });

    return this.collection.findOne({ email });
  }

  /**
   * Insert or update an employee
   *
   * @param {object} payload - user absence
   * @returns {promise<object>} employee of the user
   */
  async saveOrUpdate(payload) {
    this.logger.info('[DB] Insert or update employee', payload);

    const { email } = payload;
    const query = { email };
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

export default EmployeesRepository;
