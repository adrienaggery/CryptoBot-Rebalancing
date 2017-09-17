const arange = (start, end) => {
    if (typeof start !== 'number')
        throw new TypeError()
    if (end !== undefined && typeof end !== 'number')
        throw new TypeError()

    if (end === undefined) {
        end = start
        start = 0
    }

    const a = []
    for (i = 0; i + start < end; i++) {
        a.push(i + start)
    }
    return a
}

module.exports = arange
