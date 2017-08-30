const autobind = require('autobindr')
const colors = require('colors')

const PAMR = require('../PAMR')
const Logger = require('../Shared/Logger')

class Client {
    constructor(initialPortfolio) {
        autobind(this)

        this.xt = null
        this.bt = initialPortfolio
    }

    receivePricesMovement(xt) {
        this.xt = xt
        Logger.info(`Received prices movement vector (xt): ${JSON.stringify(xt).bold}.`)
        this._rebalancePortfolio()
    }

    _rebalancePortfolio() {
        Logger.info('Rebalancing...')
        if (!this.bt)
            Logger.warning('No portfolio vector (bt) has been found.')
        else if (!this.xt)
            Logger.warning('No price relative vector (xt) has been found.')
        else {
            const btplus1 = PAMR.PAMR0(this.xt, this.bt)
            Logger.info(`Rebalanced from ${JSON.stringify(this.bt).bold} to ${JSON.stringify(btplus1).bold}.`)
            this.bt = btplus1
            this._reflectPortfolioToBittrex()
        }
    }

    _reflectPortfolioToBittrex() {

    }
}

module.exports = Client
