const m = require('mathjs')
const { vectoravg } = require('../math')

const btplus1 = (bt, taut, xt) => {
    if (!Array.isArray(bt) || typeof taut !== 'number' || !Array.isArray(xt))
        throw new TypeError()
    return m.subtract(bt, m.multiply(taut, m.subtract(xt, vectoravg(xt))))
}

module.exports = btplus1
