import HttpErrors from 'http-errors';

/**
 * Represents service to handle shops
 */
class ShopService {
  /**
     *
     * @param {Object} args - class argument
     * @param {Object} args.logger - bunyan logger
     * @param {Object} args.shopsRepository - shops repository
    */
  constructor(args) {
    Object.assign(this, args);
  }

  /**
   * Find all shops
   * @returns {Array<object>} list of shops
   */
  async getShops() {
    return this.shopsRepository.findAll();
  }

  /**
   * Get a shop by id
   * @returns {Object} Shop
   */
  async getShopById(id) {
    return this.shopsRepository.findOneById(id);
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
   * @param {Object} payload - shop payload
   * @returns {Object} shop object
   */
  async editShop(payload) {
    const foundShop = await this.shopsRepository.findOneByEmail(payload.email);
    if (foundShop === null) {
      throw new HttpErrors.NotFound('User is not found');
    }
    const shop = await this.shopsRepository.saveOrUpdate(payload);

    return shop;
  }
}

export default ShopService;
