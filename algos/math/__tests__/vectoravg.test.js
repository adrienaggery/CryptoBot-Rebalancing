const vectoravg = require('../vectoravg')

describe('vectoravg()', () => {
    it('should throw', () => {
        expect(() => vectoravg('')).toThrow(TypeError)
    })
    it('should return the expect value', () => {
        const expected = 1.5
        expect(vectoravg([1, 2])).toBe(expected)
    })
    it('should return the expect value', () => {
        const expected = 11
        expect(vectoravg([5.5, 3, 24.5])).toBe(expected)
    })
    it('should return the expect value', () => {
        const expected = 1.005
        expect(vectoravg([1.005])).toBe(expected)
    })
})
