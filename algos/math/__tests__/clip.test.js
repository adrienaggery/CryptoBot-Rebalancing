const clip = require('../clip')

describe('clip()', () => {
    it('should throw', () => {
        expect(() => clip('toto')).toThrow(TypeError)
    })
    describe('number', () => {
        it('should return a number', () => {
            expect(typeof clip(0)).toBe('number')
        })
        it('should return the correct value', () => {
            const expected = 0
            expect(clip(0)).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 5
            expect(clip(4, {min: 5})).toBe(expected)
        })
        it('should return the correct value', () => {
            const expected = 3
            expect(clip(4, {max: 3})).toBe(expected)
        })
    })
    describe('array', () => {
        it('should return an array', () => {
            expect(Array.isArray(clip([1 ,2, 3]))).toBe(true)
        })
        it('should return the correct value', () => {
            const expected = [2, 2, 3]
            expect(clip([1 ,2, 3], {min: 2})).toEqual(expected)
        })
        it('should return the correct value', () => {
            const expected = [1, 2, 2]
            expect(clip([1 ,2, 3], {max: 2})).toEqual(expected)
        })
    })
})
