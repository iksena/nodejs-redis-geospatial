import HttpErrors from 'http-errors';
import moment from 'moment';

import constants from '../constants/index.js';

const {
  ABSENCE_STATUS: { CLOCK_IN, CLOCK_OUT },
} = constants;
/**
 * Represents service to handle absence
 */
class AbsenceService {
  /**
     *
     * @param {Object} args - class argument
     * @param {Object} args.logger - bunyan logger
     * @param {Object} args.absenceRepository - absences repository
    */
  constructor(args) {
    Object.assign(this, args);
  }

  /**
   * Save absence to database
   * @param {Object} payload - absence payload
   */
  async saveAbsence(payload) {
    const { email, time, status } = payload;
    const date = moment(time).format('YYYY-MM-DD');
    const formattedTime = moment(time).toDate();

    const foundAbsence = await this.absenceRepository.findOne(email, date);
    if (!foundAbsence && status === CLOCK_OUT) {
      throw new HttpErrors.Forbidden('You have not clocked in for today');
    }

    return this.absenceRepository.saveOrUpdate({
      email,
      date,
      time: formattedTime,
      ...status === CLOCK_IN && { clockIn: formattedTime },
      ...status === CLOCK_OUT && { clockOut: formattedTime },
    });
  }

  async getAbsences(filter) {
    return this.absenceRepository.get(filter);
  }
}

export default AbsenceService;
