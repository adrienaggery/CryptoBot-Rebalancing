const m = require('./mathjs')
const { vectoravg } = require('../math')

const taut1 = (insensitiveLoss, xt, C) => {
    const denominator = m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2)
    if (denominator === 0)
        return 0
    return Math.min(C, insensitiveLoss / m.pow(m.norm(m.subtract(xt, vectoravg(xt))), 2))
}

module.exports = taut1
