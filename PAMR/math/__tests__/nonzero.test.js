const nonzero = require('../nonzero')

describe('nonzero()', () => {
    it('should throw', () => {
        expect(() => nonzero('')).toThrow(TypeError)
    })
    it('shoudl return an array', () => {
        expect(Array.isArray(nonzero([1, 35, null, 0, 1]))).toBe(true)
    })
    it('shoud return the correct value', () => {
        const expected = [1, 2, 5]
        expect(nonzero([0, 123, -1, undefined, null, 3])).toEqual(expected)
    })
})
