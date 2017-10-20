const mathjs = require('mathjs');

const Logger = require('../shared/Logger');

/**
 * Base class of all implemented algorithms for calculating new portoflios.
 * Subclass the computeWeights method.
 *
 * Upper case letters stand for matrix and lower case for vectors (such as
 * B and b for weights).
 */
class Algo {
  /**
  * Set initial weights.
  *
  * @param {number} m - Number of assets
  * @return {array} - Array with initialized weights
  */
  static defaultWeights(m) {
    if (typeof m !== 'number') {
      throw new TypeError(`Argument m should be a number but got ${typeof m} instead.`);
    }
    const weights = Array(m).fill(1).fill(0, 1);
    Logger.debug(`Initialized default weights to ${JSON.stringify(weights)}.`);

    return weights;
  }

  /**
  * Checks if a portfolio is valid.
  *
  * @param {array} b - portfolio
  * @return {bool} - Valid or not
  */
  static isPortfolioValid(b) {
    if (!Array.isArray(b)) {
      return false;
    }
    const sum = mathjs.sum(b);
    if (sum < 0.99999999 || sum > 1.00000001) {
      return false;
    }
    return true;
  }

  /**
   * initialize instance.
   *
   * @param {number} m - Number of assets
   */
  constructor(m) {
    /*
      Type of prices going into the step function.
      ratio: xt / xt-1
      raw: pt
    */
    this.PRICE_TYPE = 'raw';

    this.B = [];
    this.X = [];
    this.m = m;

    this.B.unshift(Algo.defaultWeights(m));
  }

  /**
   * This updates the X matrix based on the PRICE_TYPE needed by the algorithm.
   *   ratio: xt / xt-1
   *   raw: pt
   *
   * @param {array} x - prices
   * @return {void}
   */
  convertPrices(x) {
    if (x.length !== this.m) {
      throw new Error('Argument x should be of same size than the instance m variable.');
    }
    if (this.PRICE_TYPE === 'ratio') {
      if (this.x) {
        this.X.unshift(mathjs.dotDivide(x, this.x));
        Logger.info(`Saved new x vector ${JSON.stringify(this.X[0])}.`);
      }
      this.x = x;
    }
    if (this.PRICE_TYPE === 'raw') {
      this.X.unshift(x);
      Logger.info(`Saved new x vector ${JSON.stringify(this.X[0])}.`);
    }
  }

  /**
   * Updates X matrix by converting prices to the algorithm needs.
   * Then compute the new weights, unshift B matrix and returns them.
   *
   * @param {array} x - Prices
   * @return {array} - Returns last weights
   */
  runOnce(x) {
    this.convertPrices(x);
    const weights = this.computeWeights();

    if (Algo.isPortfolioValid(weights)) {
      this.B.unshift(weights);
    } else {
      Logger.error(`The returned portfolio is invalid.
                    b: ${JSON.stringify(weights)}
                    X: ${JSON.stringify(this.X)}
                    B: ${JSON.stringify(this.B)}`);
    }

    Logger.info(`Computed new b vector ${JSON.stringify(this.B[0])}.`);

    return weights;
  }

  /**
   * Loops throught provided prices matrix and compute weights for each vector.
   *
   * @param {array} X - Matrix of price vectors
   * @return {void}
   */
  runBatch(X) {
    X.slice().reverse().forEach((x) => {
      this.runOnce(x);
    });
  }

  /**
   * Computes the current wealth.
   *
   * @param {number} initial - Initial wealth
   * @return {number} - wealth after period
   */
  computeWealth(initial) {
    const length = Math.min(this.B.length, this.X.length);
    const B = this.B.slice(-length).reverse();
    const X = this.X.slice(-length).reverse();

    if (X.length === 0) {
      return initial;
    }

    const dailyReturns = B.map((b, i) => {
      const grossReturn = mathjs.dot(b, X[i]);
      const paidComission =
        0.0025 * mathjs.sum(mathjs.abs(mathjs.subtract(b, i > 0 ? B[i - 1] : b)));
      return grossReturn - paidComission;
    });
    const wealth = dailyReturns.reduce((acc, v) => acc * v, initial);

    Logger.debug(`Computed wealth initial ${initial}BTC to ${wealth}BTC.`);

    return wealth;
  }
}

module.exports = Algo;
