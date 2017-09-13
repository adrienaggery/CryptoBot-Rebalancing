const bittrex = require('node.bittrex.api')
const m = require('mathjs')
const async = require('async')

const _isSell = n => n < 0 || undefined
const _isBuy = n => n > 0 || undefined

const _getOrderBookSide = (orderType) => {
    if (orderType === 'BUY')
        return 'sell'
    if (orderType === 'SELL')
        return 'buy'
    return null
}

const _getTradeUrl = (orderType) => {
    if (orderType === 'BUY')
        return 'https://bittrex.com/api/v1.1/market/buylimit'
    if (orderType === 'SELL')
        return 'https://bittrex.com/api/v1.1/market/selllimit'
    return null
}

const _getAmountSAT = (orderType, finalAmountSAT) => {
    if (orderType === 'BUY')
        return finalAmountSAT / 1.0025
    if (orderType === 'SELL')
        return finalAmountSAT / 0.9975
    return 0
}

const _drillDownOrderBook = (orderBook, amountSAT) => {
    const orderParams = { filledSAT: 0, amountALT: 0, limitPrice: 0 }
    const orderBookLength = orderBook.length
    for (i = 0; i < orderBookLength; i++) {
        if (orderParams.filledSAT >= amountSAT)
            break
        const availableToFillSAT = order.Quantity * order.Rate
        const maxFillSAT = Math.min(availableToFillSAT, amountSAT - orderParams.filledSAT)
        const fillALT = order.Quantity * (availableToFillSAT / maxFillSAT)
        orderParams.filledSAT += maxFillSAT
        orderParams.amountALT += fillALT
        orderParams.limitPrice = order.Rate
    }
    return orderParams
}

const _getOrderParams = (pair, orderType, finalAmountSAT, callback) => {
    const amountSAT = _getAmountSAT(orderType, finalAmountSAT)
    const orderBookSide = _getOrderBookSide(orderType)
    bittrex.getorderbook({ market: pair, type: orderBookSide }, (res, err) => {
        if (err) {
            Logger.error(`Could not load ${pair} ${orderBookSide.bold} order book. Error: ${JSON.stringify(err)}.`)
            return callback(true)
        }
        callback(null, _drillDownOrderBook(res.result, amountSAT))
    })
}

const _tradeAsset = (pair, orderType, finalAmountSAT, callback) => {
    if (pair === 'BTC-BTC')
        return callback(null)
    _getOrderParams(pair, orderType, finalAmountSAT, (err, params) => {
        if (err)
            return callback(true)
        const url = `${_getTradeUrl(orderType)}?market=${pair}&quantity=${params.amountALT}&rate=${params.limitPrice}`
        bittrex.sendCustomRequest(url, (res, err) => {
            if (err) {
                Logger.error(`Could not ${orderType} ${params.amountALT} ${pair.bold} at rate ${params.limitPrice}. Error: ${JSON.stringify(err)}.`)
                return callback(true)
            }
            Logger.buy(`${params.amountALT} ${pair.bold} at rate ${params.limitPrice}.`)
            callback(null)
        })
    })
}

const rebalancePortfolio = (investedAmount, pairs, oldPortfolio, newPortfolio) => {
    const diff = m.subtract(newPortfolio, oldPortfolio).map(asset => Math.round(asset * 100) / 100)
    const sellTasks = diff.map((asset, i) => {
        if (_isSell(asset))
            return (callback) => _tradeAsset(pair[i], 'SELL', investedAmount * asset, callback)
    })
    const buyTasks = diff.map((asset, i) => {
        if (_isBuy(asset))
            return (callback) => _tradeAsset(pair[i], 'BUY', investedAmount * asset, callback)
    })

    Logger.info('Selling assets...')
    async.parallel(sellTasks, (err, res) => {
        if (err) return
        Logger.info('Buying assets...')
        async.parallel(buyTasks, (err, res) => {
            if (err) return
            Logger.success('Rebalance complete !')
        })
    })
}

const getLastPrices = (pairs, callback) => {
    if (typeof pairs === 'string')
        pairs = [pairs]
    const tasks = pairs.map((pair) => (callback) => {
        if (pair === 'BTC-BTC') return callback(null, 1)
        bittrex.getticker({ market: pair }, (ticker, err) => {
            if (err) {
                Logger.error(`Could not fetch last price of ${pair}. Error: ${JSON.stringify(err)}.`)
                return callback(err)
            }
            callback(null, ticker.result.Last)
        })
    })
    async.parallel(tasks, (err, res) => {
        if (err) return callback(true)
        return callback(err, res)
    })
}

module.exports = {
    getLastPrices,
    rebalancePortfolio
}
