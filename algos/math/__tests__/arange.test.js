const arange = require('../arange')

describe('arange()', () => {
    it('should return the correct result', () => {
        const expected = [0, 1, 2]
        expect(arange(0, 3)).toEqual(expected)
    })
    it('should return the correct result', () => {
        const expected = [0.1, 1.1, 2.1]
        expect(arange(0.1, 3)).toEqual(expected)
    })
    it('should return the correct result', () => {
        const expected = [0.4, 1.4]
        expect(arange(0.4, 2.3)).toEqual(expected)
    })
    it('should return the correct result', () => {
        const expected = []
        expect(arange(0, 0)).toEqual(expected)
    })
    it('should return the correct result', () => {
        const expected = []
        expect(arange(2, 0)).toEqual(expected)
    })
    it('should return the correct result', () => {
        const expected = [0, 1, 2, 3, 4]
        expect(arange(5)).toEqual(expected)
    })
    it('should throw', () => {
        expect(() => arange('toto', 8)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => arange(8, 'toto')).toThrow(TypeError)
    })
})
