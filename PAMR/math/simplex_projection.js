const m = require('mathjs')

const cumsum = require('./cumsum')
const nonzero = require('./nonzero')
const arange = require('./arange')
const clip = require('./clip')

const simplex_projection = (v, s = 1) => {
    if (!Array.isArray(v))
        throw new TypeError(`Argument 'v' should be of type array, but got ${typeof v} instead.`)
    if (typeof s !== 'number')
        throw new TypeError(`Argument 's' should be of type number, but got ${typeof s} instead.`)


    if (m.sum(v) === s && v.every(a => a >= 0))
        return v

    v = v.map(a => Math.max(a, 0))
    const u = v.slice().sort().reverse()

    const cssv = cumsum(u)

    const rho = nonzero(m.larger(m.dotMultiply(u, arange(1, v.length + 1)), m.subtract(cssv, s))).slice(-1)[0]

    const theta = Math.max(0, parseFloat(cssv[rho] - s) / rho)

    const w = clip(m.subtract(v, theta), { min: 0 })

    return w
}

module.exports = simplex_projection
