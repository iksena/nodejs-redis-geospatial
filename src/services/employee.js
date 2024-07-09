import HttpErrors from 'http-errors';

/**
 * Represents service to handle employee
 */
class EmployeeService {
  /**
     *
     * @param {Object} args - class argument
     * @param {Object} args.logger - bunyan logger
     * @param {Object} args.employeesRepository - employees repository
    */
  constructor(args) {
    Object.assign(this, args);
  }

  /**
   * Find all employees
   * @returns {Array<object>} list of employees
   */
  async getEmployees() {
    return this.employeesRepository.findAll();
  }

  /**
   * Create an employee to DB
   * @param {Object} payload - employee payload
   * @returns {Object} employee object
   */
  async createEmployee(payload) {
    const foundEmployee = await this.employeesRepository.findOneByEmail(payload.email);
    if (foundEmployee.email === payload.email) {
      throw new HttpErrors.Forbidden('Email is already used');
    }

    return this.employeesRepository.saveOrUpdate(payload);
  }

  /**
   * Edit an employee to DB
   * @param {Object} payload - employee payload
   * @returns {Object} employee object
   */
  async editEmployee(payload) {
    const foundEmployee = await this.employeesRepository.findOneByEmail(payload.email);
    if (foundEmployee === null) {
      throw new HttpErrors.NotFound('User is not found');
    }
    const employee = await this.employeesRepository.saveOrUpdate(payload);

    return employee;
  }

  /**
   * Login for employee
   * @param {Object} payload - login payload
   * @returns {Boolean} true if success
   */
  async login(payload) {
    const { email, password } = payload;
    const employee = await this.employeesRepository.findOneByEmail(email);
    if (employee.password !== password) {
      throw new HttpErrors.Unauthorized('Incorrect email or password');
    }

    const { password: deletedPassword, ...sanitizedEmployee } = employee;

    return sanitizedEmployee;
  }
}

export default EmployeeService;
