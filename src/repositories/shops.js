import format from 'pg-format';
/**
 *  Represents the connection to shops collection in postgres
 */
class ShopsRepository {
  tableShops;
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
    this.tableShops = this.config.resources.db.tables.shops;
  }

  /**
   * Find all shops
   * @returns {Array<Object>} list of shops
   */
  async findAll() {
    const query = format('SELECT * FROM %I', this.tableShops);
    this.logger.info('[DB] Get all shops', { query });
    const { rows } = await this.dbClient.query(query);

    return rows;
  }

  /**
   * Find a shop by id
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async findOneById(id) {
    const query = format('SELECT * FROM %I WHERE id = %L', this.tableShops, id);
    this.logger.info('[DB] Find a shop', { query });
    const { rows: [result] } = await this.dbClient.query(query);

    return result;
  }

  /**
   * Insert a shop
   *
   * @param {object} payload - shop
   * @returns {promise<object>} shop
   */
  async insert(payload) {
    const query = format(
      'INSERT INTO %I (name, latitude, longitude) VALUES (%L) RETURNING *;',
      this.tableShops,
      [payload.name, payload.latitude, payload.longitude],
    );
    this.logger.info('[DB] Insert a shop', { query });
    const { rows: [result] } = await this.dbClient.query(query);

    return result;
  }
}

export default ShopsRepository;
