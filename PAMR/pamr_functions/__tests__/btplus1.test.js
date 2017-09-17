const btplus1 = require('../btplus1')

describe('btplus1()', () => {
    it('should throw', () => {
        const bt = 'hello'
        const taut = 0
        const xt = []
        expect(() => btplus1(bt, taut, xt)).toThrow(TypeError)
    })
    it('should throw', () => {
        const bt = []
        const taut = 'hello'
        const xt = []
        expect(() => btplus1(bt, taut, xt)).toThrow(TypeError)
    })
    it('should throw', () => {
        const bt = []
        const taut = 0
        const xt = 'hello'
        expect(() => btplus1(bt, taut, xt)).toThrow(TypeError)
    })
    it('should return an array', () => {
        const bt = []
        const taut = 0
        const xt = []
        expect(Array.isArray(btplus1(bt, taut, xt))).toBe(true)
    })
})
