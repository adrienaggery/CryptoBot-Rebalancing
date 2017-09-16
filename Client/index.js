#!/usr/bin/env node
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../credentials/.env')})

const bot = require('commander')
const Bittrex = require('../Shared/Bittrex')
const Client = require('./Client')

bot
    .version('1.1.0')
    .usage('<pairnames> <initialportfolio> [options]')
    .arguments('<pairnames> <initialportfolio>')
    .option('-a, --algo <algo>', 'specify with algorithm to use (PAMR0, PAMR1, PAMR2)')
    .option('-e, --epsilon <epsilon>', 'specify the Epsilon value used by the Insensitive Loss function')
    .option('-C, --agressivity <agressivity>', 'specify the agressivity C value used by the PAMR1/2 rebalancing')
    .option('-t, --tradeinterval <tradeinterval>', 'specify the interval (in ms) between each price update and rebalancing')
    .option('-i, --investedamount <investedamount>', 'specify the amount in BTC invested in this portfolio (recommended min is 0.05 as this allows to prevent placing orders less than 50k SAT)')
    .action((pairnames, initialportfolio, options) => {
        pairnames = JSON.parse(pairnames)
        initialportfolio = JSON.parse(initialportfolio)
        const algo = options.algo
        const E = parseFloat(options.epsilon) || 0.98
        const C = parseFloat(options.aggressivity) || 0
        const tradeinterval = parseInt(options.tradeinterval) || 14400000
        const investedamount = parseFloat(options.investedamount) || 0

        const client = new Client(initialportfolio, E, Bittrex.rebalancePortfolio.bind(this, investedamount, pairnames), algo, C)

        Bittrex.getLastPrices(pairnames, (err, prices) => client.receiveNewPrices(prices))
        setInterval(() => {
            Bittrex.getLastPrices(pairnames, (err, prices) => client.receiveNewPrices(prices))
        }, tradeinterval)
    })
    .parse(process.argv)
