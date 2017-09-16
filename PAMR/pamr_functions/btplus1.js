const m = require('mathjs')
const { vectoravg } = require('../math')

const btplus1 = (bt, taut, xt) =>
    m.subtract(bt, m.multiply(taut, m.subtract(xt, vectoravg(xt))))

module.exports = btplus1
