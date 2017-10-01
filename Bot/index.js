#!/usr/bin/env node
const m = require('mathjs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../credentials/.env')})

const bot = require('commander')
const Bittrex = require('../Shared/Bittrex')
const PAMR = require('../PAMR')

const getXT = (...lastPrices) => {
    if (lastPrices.length < 2)
        return null
    return m.dotDivide(lastPrices[0], lastPrices[1])
}

bot
    .version('2.0')
    .usage('<pairnames> <initialportfolio> [options]')
    .arguments('<pairnames> <initialportfolio>')
    .option('-v, --variant <variant>', 'specify with algorithm to use (PAMR0 = 0, PAMR1 = 1, PAMR2 = 2)')
    .option('-E, --epsilon <epsilon>', 'specify the Epsilon value used by the Insensitive Loss function')
    .option('-C, --agressivity <agressivity>', 'specify the agressivity C value used by the PAMR1/2 rebalancing')
    .option('-t, --tradeinterval <tradeinterval>', 'specify the interval (in ms) between each price update and rebalancing')
    .option('-i, --investedamount <investedamount>', 'specify the amount in BTC invested in this portfolio (recommended min is 0.05 as this allows to prevent placing orders less than 50k SAT)')
    .action((pairnames, initialportfolio, options) => {
        pairnames = JSON.parse(pairnames)
        initialportfolio = JSON.parse(initialportfolio)
        const variant = options.variant
        const E = parseFloat(options.epsilon) || 0.98
        const C = parseFloat(options.aggressivity) || 0
        const tradeinterval = parseInt(options.tradeinterval) || 14400000
        const investedamount = parseFloat(options.investedamount) || 0

        const pamr = new PAMR(initialportfolio, E, variant, C)

        let lastPrices = null

        Bittrex.getLastPrices(pairnames, (err, prices) => {
            const xt = getXT(prices, lastPrices)
            const portfolio = pamr.rebalance(xt)
            console.log(portfolio)
            lastPrices = prices
        }
        setInterval(() => {
            Bittrex.getLastPrices(pairnames, (err, prices) => {
                const xt = getXT(prices, lastPrices)
                const portfolio = pamr.rebalance(xt)
                console.log(portfolio)
                lastPrices = prices
            }
        }, tradeinterval)
    })
    .parse(process.argv)
