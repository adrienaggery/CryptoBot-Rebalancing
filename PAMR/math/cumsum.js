const cumsum = a => {
    if (!Array.isArray(a))
        throw new TypeError()
        
    return a.reduce((r, v) => {
        r.push((r.length && r[r.length - 1] || 0) + v)
        return r
    }, [])
}

module.exports = cumsum
