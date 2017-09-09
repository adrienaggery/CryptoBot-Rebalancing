const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../credentials/.env')})
const autobind = require('autobindr')
const colors = require('colors')
const m = require('mathjs')

const PAMR = require('../PAMR')
const Bittrex = require('../Shared/Bittrex')
const Logger = require('../Shared/Logger')

class Client {
    constructor(portfolioPairs = [], initialPortfolio = [], tradeInterval, investedAmount = 0, newPortfolioCallback) {
        autobind(this)

        this.lastPrices = null
        this.xt = null
        this.bt = initialPortfolio
        this.portfolioPairs = portfolioPairs
        this.tradeInterval = tradeInterval
        this.investedAmount = investedAmount
        this.newPortfolioCallback = newPortfolioCallback

        Logger.info('Initializing Bot.')
        if (initialPortfolio.length !== portfolioPairs.length)
            Logger.warning('The number of pairs provided doesn\'t match the portfolio length.')
        this._initializeTrading()
    }

    _initializeTrading() {
        this._getPricesAndXT()
        setInterval(this._getPricesAndXT, this.tradeInterval)
    }

    _getPricesAndXT() {
        Bittrex.getLastPrice(this.portfolioPairs, (err, prices) => {
            if (err) {
                this.lastPrices = null
                Logger.error('Could not get all last prices from Bittex.')
                return
            }
            Logger.info(`Received prices: ${JSON.stringify(prices).bold}.`)
            if (this.lastPrices) {
                this.xt = m.dotDivide(prices, this.lastPrices)
                Logger.info(`New prices movement vector (xt): ${JSON.stringify(this.xt).bold}.`)
            } else { this.xt = null }
            this.lastPrices = prices
            this._getNewPortfolio()
        })
    }

    _getNewPortfolio() {
        Logger.info('Computing new portfolio...')
        if (!this.bt)
            Logger.warning('No portfolio vector (bt) has been found.')
        else if (!this.xt)
            Logger.warning('No price relative vector (xt) has been found.')
        else {
            const btplus1 = PAMR.PAMR0(this.bt, this.xt)
            Logger.info(`New portfolio ${JSON.stringify(this.bt)} => ${JSON.stringify(btplus1).bold}.`)
            if (this.newPortfolioCallback)
                this.newPortfolioCallback(btplus1)
            this._rebalancePortfolio(this.bt, btplus1)
            this.bt = btplus1
            this.xt = null
        }
    }

    _rebalancePortfolio(bt, btplus1) {
        Logger.info('Rebalancing...')
        /*
            Diff portfolios.
            Negative values are Sell, Positive are Buy.
        */
        const diff = m.subtract(btplus1, bt).map(asset => Math.round(asset * 100) / 100)
        Logger.info(`Assets move: ${diff.map(move => move > 0 ? move.toFixed(2).green.bold : move.toFixed(2).red.bold)}`)
        diff.forEach((volume, i) => this._tradeAsset(volume, this.portfolioPairs[i]))
    }

    _tradeAsset(percentVolume, pair) {
        if (pair === 'BTC-BTC') // Skip BTC as we're not trading it.
            return
        const realVolume = Math.abs(percentVolume) * this.investedAmount
        if (percentVolume < 0)
            Bittrex.sellMarket(pair, realVolume)
        if (percentVolume > 0)
            Bittrex.buyMarket(pair, realVolume)
    }
}

module.exports = Client
