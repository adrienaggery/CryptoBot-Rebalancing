const mathjs = require('mathjs');

const Olmar = require('./Olmar');

/**
 * Robust Median Reversion. Strategy exploiting mean-reversion by robust
 * L1-median estimator. Practically the same as OLMAR.
 * Reference:
 *    Dingjiang Huang, Junlong Zhou, Bin Li, Steven C.H. Hoi, Shuigeng Zhou
 *    Robust Median Reversion Strategy for On-Line Portfolio Selection, 2013.
 *    http://ijcai.org/papers13/Papers/IJCAI13-296.pdf
 */
class Rmr extends Olmar {
  /**
   * initiaize Rmr.
   *
   * @param {number} m - Number of assets
   * @param {number} window - Lookback window
   * @param {number} E - Constraint on return for new weights on last price (average of prices).
   *                     - x * w >= eps for new weights w.
   * @param {number} tau - Precision for finding median. Recommended value is around 0.001.
   *                     - Strongly affects algo speed.
   */
  constructor(m, window = 5, E = 10, tau = 0.001) {
    super(m, window, E);

    this.tau = tau;
  }

  /**
   * compute and return the new weights.
   *
   * @return {array|null} - New weights
   */
  computeWeights() {

  }
}

module.exports = Rmr;
