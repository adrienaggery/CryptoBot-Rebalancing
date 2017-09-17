const nonzero = a => {
    if (!Array.isArray(a))
        throw new TypeError(`Argument 'a' should be of type array, but got ${typeof a} instead.`)

    return a
        .map((v, i) => v ? i : null)
        .filter(v => typeof v === 'number')
}

module.exports = nonzero
