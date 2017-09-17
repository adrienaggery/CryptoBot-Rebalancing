const cumsum = require('../cumsum')

describe('cumsum()', () => {
    it('should throw', () => {
        expect(() => cumsum(4)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => cumsum('')).toThrow(TypeError)
    })
    it('should return the correct value', () => {
        const expected = [4]
        expect(cumsum([4])).toEqual(expected)
    })
    it('should return the correct value', () => {
        const expected = [1, 3, 6]
        expect(cumsum([1, 2, 3])).toEqual(expected)
    })
    it('should return the correct value', () => {
        const expected = [1.2, 2, 2.1, 6.6]
        expect(cumsum([1.2, 0.8, 0.1, 4.5])).toEqual(expected)
    })
})
