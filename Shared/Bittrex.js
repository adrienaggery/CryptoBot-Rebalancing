const async = require('async')
const bittrex = require('node.bittrex.api')
const colors = require('colors')
bittrex.options({
    'apikey' : process.env.BITTREX_API_KEY,
    'apisecret' : process.env.BITTREX_API_SECRET
})

const Logger = require('../Shared/Logger')

const buyMarket = (pair, volume = 0) => {
    if (typeof volume !== 'number') { return }
    bittrex.getticker({ market: pair }, (ticker, err) => {
        if (err) { return }
        const url = `https://bittrex.com/api/v1.1/market/buylimit?market=${pair}&quantity=${volume}&rate=${ticker.result.Last * 1.1}`
        //Logger.buy(`Fake Buy   Pair: ${pair}   Last: ${ticker.result.Last}   Volume: ${volume}`)
        bittrex.sendCustomRequest(url, (res, err) => {
            if (err) {
                Logger.error(`Buy attempt failed. ${JSON.stringify(err)}`)
            } else {
                getOrderDetails(res.result.uuid, (err, res) => {
                    const {
                        Quantity,
                        PricePerUnit,
                        CommissionPaid
                    } = res.result
                    Logger.buy(`${(Quantity + ' ' + pair).bold} at price ${PricePerUnit} with commission ${CommissionPaid}.`)
                })
            }
        }, true)
    })
}

const sellMarket = (pair, volume) => {
    if (typeof volume !== 'number') { return }
    bittrex.getticker({ market: pair }, (ticker, err) => {
        if (err) { return }
        const url = `https://bittrex.com/api/v1.1/market/selllimit?market=${pair}&quantity=${volume}&rate=${ticker.result.Last * 0.9}`
        //Logger.sell(`Fake Sell   Pair: ${pair}   Last: ${ticker.result.Last}   Volume: ${volume}`)
        bittrex.sendCustomRequest(url, (res, err) => {
            if (err) {
                Logger.error(`Sell attempt failed. ${JSON.stringify(err)}`)
            } else {
                getOrderDetails(res.result.uuid, (err, res) => {
                    const {
                        Quantity,
                        PricePerUnit,
                        CommissionPaid
                    } = res.result
                    Logger.sell(`${(Quantity + ' ' + pair).bold} at price ${PricePerUnit} with commission ${CommissionPaid}.`)                })
            }
        }, true)
    })
}

const getLastPrice = (pairs, callback) => {
    if (typeof pairs === 'string')
        pairs = [pairs]
    const tasks = pairs.map(pair => callback => {
        if (pair === 'BTC-BTC') callback(null, 1)
        else
            bittrex.getticker({ market: pair }, (ticker, err) => {
                if (err) callback(err, null)
                else callback(null, ticker.result.Last)
            })
    })
    async.parallel(tasks, (err, res) => {
        callback(err, res)
    })
}

const getOrderDetails = (uuid, callback) => {
    bittrex.getorder({ uuid }, (res, err) => {
        if (callback) callback(err, res)
        else console.log(err, res)
    })
}

module.exports = {
    buyMarket,
    sellMarket,
    getLastPrice,
    getOrderDetails
}
