const m = require('mathjs')

const arrayCumsum = (a) => a.reduce((r, v) => {
    r.push((r.length && r[r.length - 1] || 0) + v)
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

const arrayRange = (start, end) => {
    const a = []
    for (i = 0; i + start < end; i++) {
        a.push(i + start)
    }
    return a
}

const vectorAverage = (v) => m.sum(v) / v.length

const simplex_projection = (v, s = 1) => {
    if (m.sum(v) === s && v.every(a => a >= 0))
        return v
    console.log(`v: ${v}`)
    v = v.map(a => Math.max(a, 0))
    console.log(`v: ${v}`)
    const u = v.slice().sort().reverse()
    console.log(`u: ${u}`)
    const cssv = arrayCumsum(u)
    console.log(`cssv: ${cssv}`)
    const rho = arrayNonzero(m.larger(m.multiply(u, arrayRange(1, v.length + 1)), m.subtract(cssv, s))).slice(-1)[0]
    console.log(`rho: ${rho}`)
    const theta = Math.max(0, parseFloat(cssv[rho] - s) / rho)
    console.log(`theta: ${theta}`)
    const w = arrayClip(m.subtract(v, theta), { min: 0 })

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
