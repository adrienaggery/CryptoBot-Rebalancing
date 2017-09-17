const m = require('mathjs')

const insensitiveLoss = (bt, xt, E = 1) => {
    if (!Array.isArray(bt))
        throw new TypeError(`Argument 'bt' should be of type array, but got ${typeof bt} instead.`)
    if (!Array.isArray(xt))
        throw new TypeError(`Argument 'xt' should be of type array, but got ${typeof xt} instead.`)
    if (typeof E !== 'number')
        throw new TypeError(`Argument 'E' should be of type number, but got ${typeof E} instead.`)
        
    return Math.max(0, m.dot(bt, xt) - E)
}

module.exports = insensitiveLoss
