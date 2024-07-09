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
   * @param {String} id - shop id
   * @param {Object} payload - shop payload
   * @returns {Object} shop object
   */
  async editShop(id, payload) {
    return this.shopsRepository.update(id, payload);
  }

  /**
   * Delete a shop in DB
   * @param {String} id - shop id
   * @returns {Object} shop object
   */
  async deleteShopById(id) {
    return this.shopsRepository.deleteById(id);
  }
}

export default ShopService;
