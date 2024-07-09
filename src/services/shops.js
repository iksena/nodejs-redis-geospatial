import CreateError from 'http-errors';

/**
 * Represents service to handle shops
 */
class ShopService {
  /**
     *
     * @param {Object} args - class argument
     * @param {Object} args.logger - bunyan logger
     * @param {Object} args.shopsRepository - shops repository
     * @param {Object} args.shopsGeospatialRepository - shops repository
    */
  constructor(args) {
    Object.assign(this, args);
  }

  /**
   * Find all shops
   * @returns {Array<object>} list of shops
   */
  async getShops(searchPayload) {
    const shops = await this.shopsRepository.findAll();

    if (searchPayload.radius) {
      this.logger.info('Finding nearby shops', searchPayload);
      return this.findNearby(shops, searchPayload);
    }

    return shops;
  }

  /**
   * Find nearby shops based on current location
   * @param {Array<Object>} shops - list of all shops
   * @param {Object} searchPayload - search payload
   * @param {Number} searchPayload.latitude - location latitude
   * @param {Number} searchPayload.longitude - location longitude
   * @param {Number} searchPayload.radius - radius in meters
   * @returns list of nearby shops
   */
  async findNearby(shops, searchPayload) {
    await this.shopsGeospatialRepository.reset();
    await this.shopsGeospatialRepository.populate(shops);

    const { latitude, longitude, radius } = searchPayload;
    const response = await this.shopsGeospatialRepository.findNearbyByRadius(
      latitude,
      longitude,
      radius,
    );

    return response.map(({ member, distance }) => {
      const shopDetail = shops.find((shop) => shop.id === member);

      return {
        ...shopDetail,
        distance,
      };
    });
  }

  /**
   * Get a shop by id
   * @returns {Object} Shop
   */
  async getShopById(id) {
    const result = await this.shopsRepository.findOneById(id);

    if (!result) {
      throw CreateError(404, 'Shop not found');
    }

    return result;
  }

  /**
   * Create a shop to DB
   * @param {Object} payload - shop payload
   * @returns {Object} shop object
   */
  async createShop(payload) {
    return this.shopsRepository.insert(payload);
  }

  /**
   * Edit a shop to DB
   * @param {String} id - shop id
   * @param {Object} payload - shop payload
   * @returns {Object} shop object
   */
  async editShop(id, payload) {
    const result = await this.shopsRepository.update(id, payload);

    if (!result) {
      throw CreateError(404, 'Shop not found');
    }

    return result;
  }

  /**
   * Delete a shop in DB
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async deleteShopById(id) {
    const result = await this.shopsRepository.deleteById(id);

    if (!result) {
      throw CreateError(404, 'Shop not found');
    }

    return result;
  }
}

export default ShopService;
