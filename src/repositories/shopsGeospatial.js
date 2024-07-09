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
    await this.redisClient.del(this.keyShops);
  }

  /**
   * Populate redis with shop locations
   * @param {Array<Object>} shopList - list of shops
   */
  async populate(shopList) {
    this.logger.info('Populating shop locations to Redis');

    const populatePromise = shopList.map((shop) => this.redisClient.geoAdd(this.keyShops, {
      longitude: shop.longitude,
      latitude: shop.latitude,
      member: shop.id,
    }));

    await Promise.all(populatePromise);
  }

  async findNearbyByRadius(latitude, longitude, radius) {
    const response = await this.redisClient.geoSearchWith(
      this.keyShops,
      { longitude, latitude },
      { radius, unit: 'm' },
      ['WITHDIST'],
      { SORT: 'ASC' },
    );

    this.logger.info('Found nearby locations', {
      latitude, longitude, radius,
    });

    return response;
  }
}

export default ShopsGeospatial;
