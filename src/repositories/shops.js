/**
 *  Represents the connection to shops collection in postgres
 */
class ShopsRepository {
  /**
   * Initialize ShopsRepository
   *
   * @param {object} opts - options
   * @property {object} opts.logger - logger object
   * @property {object} opts.dbClient - database client
   * @property {object} opts.config - configuration object
   * @returns {void}
   */
  constructor(opts) {
    Object.assign(this, opts);
  }

  /**
   * Find all shops
   * @returns {Array<Object>} list of shops
   */
  async findAll() {
    this.logger.info('[DB] Get all shops');
    const { rows } = await this.dbClient.query('SELECT * FROM shops');

    return rows;
  }

  /**
   * Find a shop by id
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async findOneById(id) {
    this.logger.info('[DB] Find a shop', { id });
    const { rows: [result] } = await this.dbClient.query('SELECT * FROM shops WHERE id = $1', [id]);

    return result;
  }

  /**
   * Insert or update an shop
   *
   * @param {object} payload - user absence
   * @returns {promise<object>} shop of the user
   */
  async saveOrUpdate(payload) {
    this.logger.info('[DB] Insert or update shop', payload);

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

export default ShopsRepository;
