import format from 'pg-format';
import CreateError from 'http-errors';

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
    try {
      const query = format('SELECT * FROM %I', this.tableShops);
      this.logger.info('[DB] Get all shops', { query });
      const { rows } = await this.dbClient.query(query);

      return rows;
    } catch (error) {
      this.logger.error('[DB][ERROR] Get shops error', error);

      throw CreateError(500, 'Get shops error');
    }
  }

  /**
   * Find a shop by id
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async findOneById(id) {
    try {
      const query = format('SELECT * FROM %I WHERE id = %L', this.tableShops, id);
      this.logger.info('[DB] Find a shop', { query });
      const { rows: [result] } = await this.dbClient.query(query);

      return result;
    } catch (error) {
      this.logger.error('[DB][ERROR] Get shop by id error', error);

      throw CreateError(500, 'Get shop by id error');
    }
  }

  /**
   * Delete a shop by id
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async deleteById(id) {
    try {
      const query = format('DELETE FROM %I WHERE id = %L', this.tableShops, id);
      this.logger.info('[DB] Delete a shop', { query });
      await this.dbClient.query(query);
    } catch (error) {
      this.logger.error('[DB][ERROR] Delete shop error', error);

      throw CreateError(500, 'Delete shop error');
    }
  }

  /**
   * Insert a shop
   *
   * @param {object} payload - shop
   * @returns {promise<object>} shop
   */
  async insert(payload) {
    try {
      const query = format(
        'INSERT INTO %I (name, latitude, longitude) VALUES (%L) RETURNING *;',
        this.tableShops,
        [payload.name, payload.latitude, payload.longitude],
      );
      this.logger.info('[DB] Insert a shop', { query });
      const { rows: [result] } = await this.dbClient.query(query);

      return result;
    } catch (error) {
      this.logger.error('[DB][ERROR] Insert shop error', error);

      throw CreateError(500, 'Insert shop error');
    }
  }

  /**
   * Update a shop
   *
   * @param {string} id - shop id
   * @param {object} payload - shop object
   * @returns {promise<object>} shop
   */
  async update(id, payload) {
    try {
      const values = [];
      const setQuery = Object.entries(payload).map(
        ([key, value]) => {
          values.push(value);
          return `${key} = %L`;
        },
      ).join(', ');
      const query = format(
        `UPDATE %I SET ${setQuery} WHERE id = %L RETURNING *;`,
        this.tableShops,
        ...values,
        id,
      );

      this.logger.info('[DB] Update a shop', { query });
      const { rows: [result] } = await this.dbClient.query(query);

      return result;
    } catch (error) {
      this.logger.error('[DB][ERROR] Update shop error', error);

      throw CreateError(500, 'Update shop error');
    }
  }
}

export default ShopsRepository;
