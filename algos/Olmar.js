const mathjs = require('mathjs');

const Algo = require('./Algo');
const { simplexProjection } = require('./math');

/**
 *
 */
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
   * Predicts the next price ratio based on mean of previous prices
   *
   * @return {array|null} - Predicted ratios for next period
   */
  predict() {
    if (this.X.length < 2) {
      return null;
    }

    const last = this.X[0];
    const window = this.X.slice(1, 1 + this.window);
    const ratios = window.map(v => mathjs.dotDivide(v, last));
    return mathjs.mean(ratios, 0);
  }

  /**
   * compute and return the new weights.
   *
   * @return {array|null} - New weights
   */
  computeWeights() {
    const x = this.predict();
    if (!x) {
      return null;
    }

    const b = this.B[0];

    const insensitiveLoss = Math.max(0, this.E - mathjs.dot(b, x));

    const denominator = mathjs.pow(mathjs.norm(mathjs.subtract(x, mathjs.mean(x))), 2)
    const tau = Math.max(
      0,
      insensitiveLoss / mathjs.pow(mathjs.norm(mathjs.subtract(x, mathjs.mean(x))), 2),
    );
    const weights = mathjs.add(b, mathjs.multiply(tau, mathjs.subtract(x, mathjs.mean(x))));
    const projection = simplexProjection(weights);

    return projection;
  }
}

module.exports = Olmar;
