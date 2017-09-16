const arange = (start, end) => {
    const a = []
    for (i = 0; i + start < end; i++) {
        a.push(i + start)
    }
    return a
}

module.exports = arange
