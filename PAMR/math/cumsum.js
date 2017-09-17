const cumsum = a => {
    if (!Array.isArray(a))
        throw new TypeError(`Argument 'a' should be of type array, but got ${typeof a} instead.`)

    return a.reduce((r, v) => {
        r.push((r.length && r[r.length - 1] || 0) + v)
        return r
    }, [])
}

module.exports = cumsum
