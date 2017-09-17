const nonzero = (a) => {
    if (!Array.isArray(a))
        throw new TypeError()
        
    return a
        .map((v, i) => v ? i : null)
        .filter(v => typeof v === 'number')
}

module.exports = nonzero
