const autobind = require('autobindr')
const colors = require('colors')

const PAMR = require('../PAMR')
const Logger = require('../Shared/Logger')

class Client {
    constructor(initialPortfolio, portfolioPairs, newPortfolioCallback) {
        autobind(this)

        this.xt = null
        this.bt = initialPortfolio
        this.portfolioPairs = portfolioPairs
        this.newPortfolioCallback = newPortfolioCallback

        if (initialPortfolio.length !== portfolioPairs.length)
            Logger.warning('The number of pairs provided doesn\'t match the portfolio length.')
    }

    receivePricesMovement(xt) {
        this.xt = xt
        Logger.info(`Received prices movement vector (xt): ${JSON.stringify(xt).bold}.`)
        this._getNewPortfolio()
    }

    _getNewPortfolio() {
        Logger.info('Computing new portfolio...')
        if (!this.bt)
            Logger.warning('No portfolio vector (bt) has been found.')
        else if (!this.xt)
            Logger.warning('No price relative vector (xt) has been found.')
        else {
            const btplus1 = PAMR.PAMR0(this.bt, this.xt)
            Logger.info(`Done. Movements ${JSON.stringify(this.bt)} => ${JSON.stringify(btplus1).bold}.`)
            if (this.newPortfolioCallback)
                this.newPortfolioCallback(btplus1)
            // this._rebalancePortfolio(this.bt, btplus1)
            this.bt = btplus1
            this.xt = null
        }
    }

    _rebalancePortfolio(bt, btplus1) {
        Logger.info('Rebalancing...')
        const diff = m.subtract(btplus1, bt)
        /*
            Diff portfolios and calculate amounts to move.
            This involves making Bittrex calls to know how much BTC is on each pair.
        */
    }
}

module.exports = Client
