const arange = (start, end) => {
    if (typeof start !== 'number')
        throw new TypeError(`Argument 'start' should be of type number, but got ${typeof start} instead.`)
    if (end !== undefined && typeof end !== 'number')
        throw new TypeError(`Argument 'end' should be undefined or of type number, but got ${typeof end} instead.`)

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
