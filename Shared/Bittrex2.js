const bittrex = require('node.bittrex.api')
const m = require('mathjs')

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
    const orderParams = { filledSAT, = 0, amoutALT = 0, limitPrice: 0 }
    const orderBookLength = orderBook.length
    for (i = 0; i < orderBookLength; i++) {
        if (orderParams.filledSAT >= amountSAT)
            break
        const availableToFillSAT = order.Quantity * order.Rate
        const fillSAT = Math.min(availableToFillSAT, orderParams.filledSAT)
        orderParams.filledSAT += fillSAT
        orderParams.amountALT += fillSAT * order.Rate
        orderParams.limitPrice = order.Rate
    }
    return orderParams
}

const _getOrderParams = (pair, orderType, finalAmountSAT, callback) => {
    const amountSAT = _getAmountSAT(orderType, finalAmountSAT)
    const orderBookSide = _getOrderBookSide(orderType)
    bittrex.getorderbook({ market: pair, type: orderBookSide }, (res, err) => {
        if (err) {
            Logger.error(`Could not load ${pair} ${orderBookSide.bold} order book.`)
            return callback(true)
        }
        callback(null, _drillDownOrderBook(res.result, amountSAT))
    })
}

const _tradeAsset = (pair, orderType, finalAmountSAT, callback) => {
    _getOrderParams(pair, orderType, finalAmountSAT, (err, params) => {
        if (err) {
            callback(true)
            return
        }
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

}

module.exports = {
    rebalancePortfolio
}

// amount * 1.0025 = finalamount
