const autobind = require('autobindr')
const colors = require('colors')
const m = require('mathjs')

const PAMR = require('../PAMR')
const Logger = require('../Shared/Logger')

class Client {
    constructor(initialPortfolio, E, newPortfolioCallback, algo = 'PAMR0', C) {
        autobind(this)

        this.prices = null

        this.bt = initialPortfolio
        this.E = E
        this.newPortfolioCallback = newPortfolioCallback
        this.algo = algo
        this.C = C

        Logger.info(`Bot is running. initial portfolio: ${this.bt}`)
    }

    receiveNewPrices(newPrices, oldPrices) {
        if (oldPrices)
            this.prices = oldPrices
        Logger.info(`Received new prices ${newPrices}.`)
        if (this.prices && newPrices) {
            const xt = m.dotDivide(newPrices, this.prices)
            Logger.info(`Prices vector XT is ${this._formatPriceVector(xt)}.`)
            this._getNewPortfolio(xt)
        }
        this.prices = newPrices
    }

    _formatPriceVector(x) {
        return '[' + x.map(price => {
            if (price > 1)
                return `${price}`.green
            if (price < 1)
                return `${price}`.red
            return price
        }) + ']'
    }

    _getNewPortfolio(xt) {
        Logger.info('Computing new portfolio...')
        if (!this.bt)
            Logger.warning('No portfolio vector (bt) has been found.')
        else {
            const btplus1 = PAMR(this.bt, xt, this.E, this.algo, this.C)
            Logger.info(`New portfolio ${JSON.stringify(btplus1).bold}.`)
            if (this.newPortfolioCallback)
                this.newPortfolioCallback(this.bt, btplus1)
            this.bt = btplus1
        }
    }
}

module.exports = Client
