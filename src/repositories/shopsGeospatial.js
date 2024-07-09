import CreateError from 'http-errors';

class ShopsGeospatial {
  /**
   * Initialize ShopsGeospatialRepository
   *
   * @param {object} opts - options
   * @property {object} opts.logger - logger object
   * @property {object} opts.redisClient - redis client
   * @property {object} opts.config - configuration object
   * @returns {void}
   */
  constructor(opts) {
    Object.assign(this, opts);
    this.keyShops = this.config.resources.redis.keys.shopsGeospatial;
  }

  /**
   * Reset shops geospatial
   */
  async reset() {
    try {
      this.logger.info('[REDIS] Reset shop locations');

      await this.redisClient.del(this.keyShops);
    } catch (error) {
      this.logger.error('[REDIS][ERROR] Reset shop locations error', error);

      throw CreateError(500, 'Reset shop locations error');
    }
  }

  /**
   * Populate redis with shop locations
   * @param {Array<Object>} shopList - list of shops
   */
  async populate(shopList) {
    try {
      this.logger.info('[REDIS] Populating shop locations');

      const populatePromise = shopList.map((shop) => this.redisClient.geoAdd(this.keyShops, {
        longitude: shop.longitude,
        latitude: shop.latitude,
        member: shop.id,
      }));

      await Promise.all(populatePromise);
    } catch (error) {
      this.logger.error('[REDIS][ERROR] Populate shop locations error', error);

      throw CreateError(500, 'Populate shop locations error');
    }
  }

  async findNearbyByRadius(latitude, longitude, radius) {
    try {
      const response = await this.redisClient.geoSearchWith(
        this.keyShops,
        { longitude, latitude },
        { radius, unit: 'm' },
        ['WITHDIST'],
        { SORT: 'ASC' },
      );

      this.logger.info('[REDIS] Found nearby locations', {
        latitude, longitude, radius,
      });

      return response;
    } catch (error) {
      this.logger.error('[REDIS][ERROR] Find nearby shop locations error', error);

      throw CreateError(500, 'Find nearby shop locations error');
    }
  }
}

export default ShopsGeospatial;
