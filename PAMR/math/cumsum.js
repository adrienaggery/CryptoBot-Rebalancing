const cumsum = a => a.reduce((r, v) => {
    r.push((r.length && r[r.length - 1] || 0) + v)
    return r
}, [])

module.exports = cumsum
