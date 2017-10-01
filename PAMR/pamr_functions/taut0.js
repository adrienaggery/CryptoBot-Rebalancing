const m = require('mathjs')
const { vectoravg } = require('../math')

const taut0 = (insensitiveLoss, xt) => {
    if (typeof insensitiveLoss !== 'number')
        throw new TypeError(`Argument 'insensitiveLoss' should be of type number, but got ${typeof insensitiveLoss} instead.`)
    if (!Array.isArray(xt))
        throw new TypeError(`Argument 'xt' should be of type array, but got ${typeof xt} instead.`)

    const denominator = m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    if (denominator === 0)
        return 0
    const taut = insensitiveLoss / denominator
    return Math.max(0, taut)
}

module.exports = taut0
