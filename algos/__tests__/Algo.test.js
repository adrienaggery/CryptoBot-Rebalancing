const mathjs = require('mathjs');
const Algo = require('../Algo');

describe('Algo', () => {
  describe('constructor()', () => {
    it('should throw', () => {
      const f = () => {
        const instance = new Algo();
        return instance;
      };
      expect(f).toThrow(TypeError);
    });
    it('should have a m number that equals the one passed in constructor', () => {
      const instance = new Algo(4);
      expect(instance.m).toBe(4);
    });
    it('should have an empty X matrix on new instance', () => {
      const instance = new Algo(4);
      expect(instance.X).toEqual([]);
    });
    it('should have a B matrix with one item', () => {
      const instance = new Algo(4);
      expect(Array.isArray(instance.B)).toBe(true);
      expect(instance.B).toHaveLength(1);
    });
    it('should have a B matrix with one item of length m', () => {
      const instance = new Algo(4);
      expect(instance.B[0]).toHaveLength(4);
    });
  });
  describe('convertPrices() raw', () => {
    it('should throw', () => {
      const instance = new Algo(4);
      const newPrices = [1.1, 0.9, 1];
      const f = () => {
        instance.convertPrices(newPrices);
      };
      expect(f).toThrow(Error);
    });
    it('should increase the X matrix by 1 with the passed argument', () => {
      const instance = new Algo(4);
      const newPrices = [0.00841, 0.07, 0.145, 0.231056];
      instance.convertPrices(newPrices);
      expect(instance.X).toHaveLength(1);
      expect(instance.X[0]).toEqual(newPrices);
    });
    it('should have most recent price at the start of the X array (unshift)', () => {
      const instance = new Algo(4);
      const prices1 = [0.00841, 0.07, 0.145, 0.231056];
      const prices2 = [0.009, 0.05, 0.147, 0.271078];
      instance.convertPrices(prices1);
      instance.convertPrices(prices2);
      expect(instance.X).toHaveLength(2);
      expect(instance.X[0]).toEqual(prices2);
      expect(instance.X[1]).toEqual(prices1);
    });
  });
  describe('convertPrices() ratio', () => {
    it('should not change the X matrix', () => {
      const instance = new Algo(4);
      instance.PRICE_TYPE = 'ratio';
      const prices1 = [0.00841, 0.07, 0.145, 0.231056];
      instance.convertPrices(prices1);
      expect(instance.X).toHaveLength(0);
    });
    it('should calculate and store the ratio', () => {
      const instance = new Algo(4);
      instance.PRICE_TYPE = 'ratio';
      const prices1 = [0.00841, 0.07, 0.145, 0.231056];
      const prices2 = [0.009, 0.05, 0.147, 0.271078];
      instance.convertPrices(prices1);
      instance.convertPrices(prices2);
      expect(instance.X).toHaveLength(1);
      expect(instance.X[0]).toEqual(mathjs.dotDivide(prices2, prices1));
    });
  });
  describe('computeWealth()', () => {
    it('should return the initial wealth if X is empty', () => {
      const instance = new Algo(4);
      expect(instance.computeWealth(1)).toBe(1);
    });
    it('should return the correct result', () => {
      const instance = new Algo(4);
      instance.X = [[1.1, 0.9, 0.98, 1.034]];
      expect(instance.computeWealth(1)).toBe(1.1);
    });
    it('should return the correct result', () => {
      const instance = new Algo(4);
      instance.X = [[1.1, 0.9, 0.98, 1.034], [0.97, 1.01, 1.08, 0.89]];
      expect(instance.computeWealth(1)).toBe(0.97);
    });
    it('should return the correct result', () => {
      const instance = new Algo(4);
      instance.X = [[1.1, 0.9, 0.98, 1.034], [0.97, 1.01, 1.08, 0.89]];
      instance.B.unshift([0, 1, 0, 0]);
      expect(instance.computeWealth(1)).toBe(0.873);
    });
  });
});
