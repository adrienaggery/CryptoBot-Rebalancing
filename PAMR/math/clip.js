const clip = (n, c = {}) => {
    if (typeof c.min === 'number' && n < c.min)
        return c.min
    if (typeof c.max === 'number' && n > c.max)
        return c.max
    return n
}

module.exports = (value, c) => {
    if (Array.isArray(value))
        return value.map(v => clip(v, c))
    if (typeof value === 'number')
        return clip(value, c)
    throw new TypeError
}
