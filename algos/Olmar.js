const Algo = require('Algo');

class Olmar extends Algo {
  /**
   * initiaize Olmar.
   *
   * @param {number} m - Number of assets
   * @param {number} window - Lookback window
   * @param {number} E - Constraint on return for new weights on last price (average of prices).
   *                     - x * w >= eps for new weights w.
   */
  constructor(m, window = 5, E = 10) {
    super(m);

    this.window = window;
    this.E = E;
  }

  /**
   * compute and return the new weights.
   *
   * @return {array|null} - New weights
   */
  computeWeights() {

  }
}

module.exports = Olmar;
