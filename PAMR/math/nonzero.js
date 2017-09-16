const nonzero = (a) => a
    .map((v, i) => v ? i : null)
    .filter(v => typeof v === 'number')

module.exports = nonzero
