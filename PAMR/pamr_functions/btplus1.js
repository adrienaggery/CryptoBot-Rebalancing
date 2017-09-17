const m = require('mathjs')
const { vectoravg } = require('../math')

const btplus1 = (bt, taut, xt) => {
    if (!Array.isArray(bt))
        throw new TypeError(`Argument 'bt' should be of type array, but got ${typeof bt} instead.`)
    if (typeof taut !== 'number')
        throw new TypeError(`Argument 'taut' should be of type number, but got ${typeof taut} instead.`)
    if (!Array.isArray(xt))
        throw new TypeError(`Argument 'xt' should be of type array, but got ${typeof xt} instead.`)

    return m.subtract(bt, m.multiply(taut, m.subtract(xt, vectoravg(xt))))
}

module.exports = btplus1
