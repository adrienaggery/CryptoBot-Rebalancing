const m = require('mathjs')

const vectoravg = v => {
    if (!Array.isArray(v))
        throw new TypeError(`Argument 'v' should be of type array, but got ${typeof v} instead.`)

    return m.sum(v) / v.length
}

module.exports = vectoravg
