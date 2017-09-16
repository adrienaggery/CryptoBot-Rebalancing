const m = require('mathjs')

const vectoravg = v => m.sum(v) / v.length

module.exports = vectoravg
