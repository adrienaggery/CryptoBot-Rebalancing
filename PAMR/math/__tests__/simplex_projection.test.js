const simplex_projection = require('../simplex_projection')

describe('simplex_projection', () => {
    it('should throw', () => {
        expect(() => simplex_projection('', 1)).toThrow(TypeError)
    })
    it('should throw', () => {
        expect(() => simplex_projection([], '')).toThrow(TypeError)
    })
    it('should return an array', () => {
        expect(Array.isArray(simplex_projection([0.2, 0.2], 1))).toBe(true)
    })
})
