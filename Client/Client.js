const autobind = require('autobindr')
const colors = require('colors')
const m = require('mathjs')

const PAMR = require('../PAMR')
const Logger = require('../Shared/Logger')

class Client {
    constructor(initialPortfolio = [], epsilon = 0.99, newPortfolioCallback) {
        autobind(this)

        this.prices = null
        this.epsilon = epsilon
        this.bt = initialPortfolio
        this.newPortfolioCallback = newPortfolioCallback

        Logger.info('Bot is running.')
    }

    receiveNewPrices(newPrices) {
        Logger.info(`Received new prices ${newPrices}.`)
        if (this.prices && newPrices) {
            const xt = m.dotDivide(newPrices, this.prices)
            Logger.info(`Prices vector XT is ${this._formatPriceVector(xt)}.`)
            this._getNewPortfolio(xt)
        }
        this.prices = newPrices
    }

    _getNewPortfolio(xt) {
        Logger.info('Computing new portfolio...')
        if (!this.bt)
            Logger.warning('No portfolio vector (bt) has been found.')
        else {
            const btplus1 = PAMR.PAMR0(this.bt, this.xt, this.epsilon)
            Logger.info(`New portfolio ${JSON.stringify(btplus1).bold}.`)
            if (this.newPortfolioCallback)
                this.newPortfolioCallback(btplus1)
            this.bt = btplus1
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
        diff.forEach((volume, i) => this._tradeAsset(volume, this.portfolioPairs[i], i))
    }

    _tradeAsset(percentVolume, pair, i) {
        if (pair === 'BTC-BTC') // Skip BTC as we're not trading it.
            return
        const realVolume = (Math.abs(percentVolume) * this.investedAmount) / this.lastPrices[i]
        if (percentVolume < 0)
            Bittrex.sellMarket(pair, realVolume)
        if (percentVolume > 0)
            Bittrex.buyMarket(pair, realVolume)
    }
}

module.exports = Client
