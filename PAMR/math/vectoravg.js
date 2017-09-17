const m = require('mathjs')

const vectoravg = v => {
    if (!Array.isArray(v))
        throw new TypeError()
        
    return m.sum(v) / v.length
}

module.exports = vectoravg
