const toFloat2 = require('../toFloat2')

describe('toFloat2', () => {
    it('should throw', () => {
        expect(() => toFloat2('toto')).toThrow(TypeError)
    })
    describe('number', () => {
        it('should return a number', () => {
            expect(typeof toFloat2(0.12345)).toBe('number')
        })
        it('should return the correct value', () => {
            const expected = 0
            expect(toFloat2(0)).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 5
            expect(toFloat2(5)).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 0.55
            expect(toFloat2(0.551)).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 0.56
            expect(toFloat2(0.555)).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 1.01
            expect(toFloat2(1.005)).toBe(expected)
        })
    })
    describe('array', () => {
        it('should return an array', () => {
            expect(Array.isArray(toFloat2([1.123, 2.345]))).toBe(true)
        })
        it('should return the correct value', () => {
            const expected = [1.55, 1.56]
            expect(toFloat2([1.5549, 1.555])).toEqual(expected)
        })
        it('should return the correct value', () => {
            const expected = [1.01]
            expect(toFloat2([1.005])).toEqual(expected)
        })
    })
})
