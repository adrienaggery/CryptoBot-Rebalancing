const insensitiveLoss = require('../insensitiveLoss')

describe('insensitiveLoss()', () => {
    it('should throw', () => {
        expect(() => insensitiveLoss('hello')).toThrow(TypeError)
    })
    it('should throw', () => {
        const bt = [0.5, 0.5]
        expect(() => insensitiveLoss(bt, 'hello')).toThrow(TypeError)
    })
    it('should throw', () => {
        const bt = [0.5, 0.5]
        const xt = [1.2, 0.85]
        expect(() => insensitiveLoss(bt, xt, 'hello')).toThrow(TypeError)
    })
    it('should return a number', () => {
        const bt = [0.5, 0.5]
        const xt = [1.2, 0.85]
        expect(typeof insensitiveLoss(bt, xt)).toBe('number')
    })
    it('should return 0 or greater', () => {
        const bt = [0.5, 0.5]
        const xt = [1, 0.85]
        expect(insensitiveLoss(bt, xt)).toBeGreaterThanOrEqual(0)
    })
    it('should return 0 or greater', () => {
        const bt = [0.5, 0.5]
        const xt = [0.91, 0.91]
        const E = 0.9
        expect(insensitiveLoss(bt, xt, E)).toBeGreaterThan(0)
    })
    it('should return 0 or greater', () => {
        const bt = [0.5, 0.5]
        const xt = [0.9, 0.9]
        const E = 0.9
        expect(insensitiveLoss(bt, xt, E)).toBe(0)
    })
    it('should return 0 or greater', () => {
        const bt = [0.5, 0.5]
        const xt = [0.8, 0.8]
        const E = 0.9
        expect(insensitiveLoss(bt, xt, E)).toBe(0)
    })
})
