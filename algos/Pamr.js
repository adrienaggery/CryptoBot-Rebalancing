const mathjs = require('mathjs');

const Algo = require('./Algo');
const { vectoravg, simplex_projection } = require('./math');

/**
 * Passive aggressive mean reversion strategy for portfolio selection.
 * There are three variants with different parameters, see original article for details.
 * Reference:
 *    B. Li, P. Zhao, S. C.H. Hoi, and V. Gopalkrishnan.
 *    Pamr: Passive aggressive mean reversion strategy for portfolio selection, 2012.
 *    http://www.cais.ntu.edu.sg/~chhoi/paper_pdf/PAMR_ML_final.pdf
 */
class Pamr extends Algo {
  static PRICE_TYPE = 'ratio';

  /**
   * initiaize Pamr.
   *
   * @param {number} m - Number of assets
   * @param {number} variant - Pamr variant (0, 1 or 2)
   * @param {number} E - Epsilon value used by Insensitive Loss function
   * @param {number} C - Aggressivity parameter used by variant 1 and 2
   */
  constructor(m, variant, E, C) {
    super(m);

    this.variant = variant;
    this.E = E;
    this.C = C;
  }

  /**
   * Return tau value based on chosen Pamr variant.
   *
   * @param {number} insensitiveLoss - Insensitive loss for that period.
   * @return {number} - Tau value
   */
  tau(insensitiveLoss) {
    const x = this.X[0];
    if (this.variant === 0) {
      const denominator = mathjs.pow(mathjs.norm(mathjs.subtract(x, vectoravg(x))), 2);
      if (denominator === 0) {
        return 0;
      }
      const tau = insensitiveLoss / denominator;
      return Math.max(0, tau);
    }
    return 0;
  }

  /**
   * compute and return the new weights.
   *
   * @return {array} - New weights
  */
  computeWeights() {
    const b = this.B[0];
    const x = this.X[0];

    const insensitiveLoss = Math.max(0, mathjs.dot(b, x) - this.E);
    const tau = this.tau(insensitiveLoss);
    const weights = mathjs.subtract(b, mathjs.multiply(tau, mathjs.subtract(x, vectoravg(x))));
    const projection = simplex_projection(weights);

    return projection;
  }
}

module.exports = Pamr;
