const toFloat2 = n => Number(Math.round(n + 'e2') + 'e-2')

module.exports = value => {
    if (typeof value === 'number')
        return toFloat2(value)
    if (Array.isArray(value))
        return value.map(v => toFloat2(v))
    throw new TypeError(`Argument 'value' should be of type number or array, but got ${typeof value} instead.`)
}
