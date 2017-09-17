const taut0 = require('../taut0')

describe('taut0()', () => {
    it('should throw', () => {
        expect(() => taut0('', [])).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut0(0.4, '')).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => taut0(0.4)).toThrow(TypeError)
    })
    it('should return a number', () => {
        expect(typeof taut0(0.4, [1, 1.1, 0.9])).toBe('number')
    })
    it('should return a number', () => {
        expect(taut0(0.4, [1, 1.1, 0.9])).toBeGreaterThanOrEqual(0)
    })
})
