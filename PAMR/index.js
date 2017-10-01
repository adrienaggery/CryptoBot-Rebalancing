/* eslint-disable */
const autobind = require('autobindr')
const colors = require('colors')
const m = require('mathjs')

const { insensitiveLoss, taut, btplus1 } = require('./pamr_functions')
const { simplex_projection, toFloat2 } = require('./math')
const Logger = require('../Shared/Logger')

class PAMR {
    constructor(initialPortfolio, E, variant = 0, C = 0) {
        autobind(this)

        if (!Array.isArray(initialPortfolio))
            throw new TypeError(`PAMR constructor expects initialPortfolio to be of type array, but got ${typeof initialPortfolio} instead.`)
        if (typeof E !== 'number' || E < 0)
            throw new TypeError(`PAMR constructor expects E to be >= 0, but got ${E} instead.`)
        if (typeof variant !== 'number' || (variant !== 0 && variant !== 1 && variant !== 2))
            throw new TypeError(`PAMR constructor expects variant to be either 0, 1 or 2, but got ${variant} instead.`)
        if (typeof C !== 'number' || C < 0)
            throw new TypeError(`PAMR constructor expects C to be >= 0, but got ${C} instead.`)

        this.bt = initialPortfolio
        this.E = E
        this.variant = variant
        this.C = C

        Logger.info(`Bot is running. initial portfolio: ${JSON.stringify(this.bt)}.`)
    }

    rebalance(xt) {
        Logger.info(`Rebalancing with Xt ~ ${JSON.stringify(toFloat2(xt))}.`)
        const newPortfolio = this._run(xt)
        Logger.info(`New portfolio ${JSON.stringify(newPortfolio).bold}.`)
        this.bt = newPortfolio
        return newPortfolio
    }

    _run(xt) {
        const _ltE = insensitiveLoss(this.bt, xt, this.E)
        const _taut = taut[this.variant](_ltE, xt, this.C)
        const _btplus1 = btplus1(this.bt, _taut, xt)
        const _btplus1Normalized = simplex_projection(_btplus1, 1)

        // const _btplus1NormalizedTrimed = toFloat2(_btplus1Normalized)

        return _btplus1Normalized
    }
}

module.exports = PAMR
