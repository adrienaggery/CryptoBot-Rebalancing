const m = require('mathjs')

const arrayCumsum = (a) => a.reduce((r, v) => {
    r.push((r.length && r[r.length - 1] || 0) + a)
    return r
}, [])

const arrayNonzero = (a) => a.map((v, i) => v ? i : null).filter(v => typeof v === 'number')

const clip = (n, c = {}) => {
    if (typeof c.min === 'number' && n < c.min)
        return c.min
    if (typeof c.max === 'number' && n > c.max)
        return c.max
    return n
}

const arrayClip = (a, c) => a.map(v => clip(v, c))

const vectorAverage = (v) => m.sum(v) / v.length

const simplex_projection = (v, s = 1) => {
    if (m.sum(v) === s && !v.some(a <= 0))
        return v

    v = v.map(a => Math.max(a, 0))

    const u = v.slice().sort().reverse()
    const cssv = arrayCumsum(u)

    const rho = arrayNonzero(m.larger(m.multiply(u, arange(1, v.length + 1)), m.subtract(cssv, s))).slice(-1)[0]

    const theta = Math.max(0, parseFloat(cssv[rho] - s) / rho)

    const w = arrayClip(m.sutract(v, theta), { min: 0 })

    return w
}

module.exports = {
    arrayCumsum,
    arrayNonzero,
    clip,
    arrayClip,
    vectorAverage,
    simplex_projection
}
