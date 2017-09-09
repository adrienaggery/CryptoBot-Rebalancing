const colors = require('colors')

const _log = (type, message) => {
    const time = `[${new Date().toLocaleTimeString()}]`
    console.log(time, type, message)
}

const success = message => {
    const type = '[Success]'.black.bgGreen
    _log(type, message)
}

const warning = message => {
    const type = '[Warning]'.black.bgYellow
    _log(type, message)
}

const error = message => {
    const type = '[Error]'.black.bgRed
    _log(type, message)
}

const info = message => {
    const type = '[Info]'.black.bgWhite
    _log(type, message)
}

const buy = message => {
    const type = '[Buy]'.black.bgGreen
    _log(type, message)
}

const sell = message => {
    const type = 'Sell'.black.bgRed
    _log(type, message)
}

module.exports = {
    success,
    warning,
    error,
    info,
    buy,
    sell
}
