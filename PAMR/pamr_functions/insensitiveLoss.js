const m = require('mathjs')

const insensitiveLoss = (bt, xt, E = 1) => Math.max(0, m.dot(bt, xt) - E)

module.exports = insensitiveLoss
