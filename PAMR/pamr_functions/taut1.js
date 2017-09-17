const m = require('mathjs')
const { vectoravg } = require('../math')

const taut1 = (insensitiveLoss, xt, C) => {
    if (typeof insensitiveLoss !== 'number')
        throw new TypeError(`Argument 'insensitiveLoss' should be of type number, but got ${typeof insensitiveLoss} instead.`)
    if (!Array.isArray(xt))
        throw new TypeError(`Argument 'xt' should be of type array, but got ${typeof xt} instead.`)
    if (typeof C !== 'number')
        throw new TypeError(`Argument 'C' should be of type number, but got ${typeof C} instead.`)

    const denominator = m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    if (denominator === 0)
        return 0
    const taut = insensitiveLoss / m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    return Math.min(C, Math.max(0, taut))
}

module.exports = taut1
