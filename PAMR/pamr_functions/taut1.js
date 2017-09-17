const m = require('mathjs')
const { vectoravg } = require('../math')

const taut1 = (insensitiveLoss, xt, C) => {
    const denominator = m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    if (denominator === 0)
        return 0
    const taut = insensitiveLoss / m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    return Math.min(C, Math.max(0, taut))
}

module.exports = taut1
