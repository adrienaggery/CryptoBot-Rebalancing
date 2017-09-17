const taut1 = require('../taut1')

describe('taut1()', () => {
    it('should throw', () => {
        expect(() => taut1('', [], 10)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut1(0.4, '', 10)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut1(0.4, [], '')).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut1(0.4)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut1(0.4, [])).toThrow(TypeError)
    })
    it('should return a number', () => {
        expect(typeof taut1(0.4, [1, 1.1, 0.9], 10)).toBe('number')
    })
    it('should be greater than or equal to C', () => {
        const C = 10
        expect(taut1(0.4, [1, 1.1, 0.9], C)).toBeGreaterThanOrEqual(C)
    })
})
