const m = require('mathjs')

const insensitiveLoss = (bt, xt, E = 1) => {
    if (!Array.isArray(bt) || !Array.isArray(xt) || typeof E !== 'number')
        throw new TypeError()
    return Math.max(0, m.dot(bt, xt) - E)
}

module.exports = insensitiveLoss
