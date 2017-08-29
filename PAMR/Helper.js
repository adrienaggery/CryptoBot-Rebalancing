const m = require('mathjs')

const insensitiveLoss = (b, xt, E = 1) => {
    const dot = m.dot(b, xt)
    return (dot <= E ? 0 : dot - E)
}

module.exports = {
    insensitiveLoss
}
