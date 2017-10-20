const Olmar = require('../Olmar');

describe('Olmar', () => {
  describe('constructor()', () => {
    it('should be configured with PRICE_TYPE raw', () => {
      const instance = new Olmar(4);
      expect(instance.PRICE_TYPE).toBe('raw');
    });
    it('should have a window variable set to the one passed in constructor', () => {
      const instance = new Olmar(4, 6);
      expect(instance.window).toBe(6);
    });
    it('should have a E variable set to the one passed in constructor', () => {
      const instance = new Olmar(4, 6, 34);
      expect(instance.E).toBe(34);
    });
  });
  describe('predict()', () => {
    it('should be defined', () => {
      const instance = new Olmar(4);
      expect(instance.predict).toBeDefined();
    });
    it('should return null if less than 2 prices in X', () => {
      const instance = new Olmar(4);
      expect(instance.predict()).toEqual(null);
    });
    it('should return null if less than 2 prices in X', () => {
      const instance = new Olmar(4);
      instance.X = [[0.00986, 0.00131]];
      expect(instance.predict()).toEqual(null);
    });
    it('should return the right vector', () => {
      const instance = new Olmar(4);
      instance.X = [[0.00680, 0.00134], [0.00680, 0.00134]];
      expect(instance.predict()).toEqual([1, 1]);
    });
    it('should return the right vector', () => {
      const instance = new Olmar(4);
      instance.X = [[0.00600, 0.00100], [0.00900, 0.00080]];
      expect(instance.predict()).toEqual([1.5, 0.8]);
    });
    it('should return the right vector', () => {
      const instance = new Olmar(4);
      instance.X = [[0.00900, 0.00180], [0.00760, 0.00171], [0.00680, 0.00189]];
      expect(instance.predict()).toEqual([0.8, 1]);
    });
  });
  describe('computeWeights()', () => {
    it('should be defined', () => {
      const instance = new Olmar(4);
      expect(instance.computeWeights).toBeDefined();
    });
    it('should return null if predicted price is null', () => {
      const instance = new Olmar(4);
      expect(instance.computeWeights()).toEqual(null);
    });
    it('should return an array of same size than instance.m', () => {
      const instance = new Olmar(4);
      instance.X = [[0.000207, 0.00679, 0.02, 0.00123], [0.00021, 0.00600, 0.021, 0.00139]];
      expect(Array.isArray(instance.computeWeights())).toBe(true);
      expect(instance.computeWeights()).toHaveLength(4);
    });
  });
});
