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
    .option('-e, --epsilon <epsilon>', 'specify the Epsilon value used by the Insensitive Loss function', parseFloat, 0.98)
    .option('-C, --agressivity <agressivity>', 'specify the agressivity C value used by the PAMR1/2 rebalancing', parseFloat, 0)
    .option('-t, --tradeinterval <tradeinterval>', 'specify the interval between each price update and rebalancing')
    .option('-i, --investedamount <investedamount>', 'specify the amount in BTC invested in this portfolio', parseFloat, 0)
    .action((pairnames, initialportfolio, options) => {
        pairnames = JSON.parse(pairnames)
        initialportfolio = JSON.parse(initialportfolio)
        const tradeinterval = parseInt(options.tradeinterval) || 14400000
        const epsilon = parseFloat(options.epsilon) || 0.98
        const investedamount = parseFloat(options.investedamount) || 0
        const agressivity = parseFloat(options.aggressivity) || 0

        const client = new Client(initialportfolio, epsilon, Bittrex.rebalancePortfolio.bind(this, investedamount, pairnames))

        Bittrex.getLastPrices(pairnames, (err, prices) => client.receiveNewPrices(prices))
        setInterval(() => {
            Bittrex.getLastPrices(pairnames, (err, prices) => client.receiveNewPrices(prices))
        }, tradeinterval)
    })
    .parse(process.argv)
