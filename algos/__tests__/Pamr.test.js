const Pamr = require('../Pamr');

describe('Pamr', () => {
  describe('constructor()', () => {
    it('should be configured with PRICE_TYPE ratio', () => {
      const instance = new Pamr(4);
      expect(instance.PRICE_TYPE).toBe('ratio');
    });
    it('should have a variant variable set to the one passed in constructor', () => {
      const instance = new Pamr(4, 1);
      expect(instance.variant).toBe(1);
    });
    it('should have a E variable set to the one passed in constructor', () => {
      const instance = new Pamr(4, 0, 0.1);
      expect(instance.E).toBe(0.1);
    });
    it('should have a C variable set to the one passed in constructor', () => {
      const instance = new Pamr(4, 1, 0.1, 900);
      expect(instance.C).toBe(900);
    });
  });
  describe('computeWeights()', () => {
    it('should be defined', () => {
      const instance = new Pamr(4);
      expect(instance.computeWeights).toBeDefined();
    });
    it('should return the same portfolio if there no prices in X', () => {
      const instance = new Pamr(4);
      expect(instance.computeWeights()).toEqual(instance.B[0]);
    });
    it('should return an array of same size than instance.m', () => {
      const instance = new Pamr(4);
      instance.X = [[1.1, 0.95, 0.98, 1.02]];
      expect(Array.isArray(instance.computeWeights())).toBe(true);
      expect(instance.computeWeights()).toHaveLength(4);
    });
  });
});
