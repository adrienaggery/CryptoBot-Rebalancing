#!/usr/bin/env node

/* eslint-disable */

const m = require('mathjs')
const bot = require('commander')

const PAMR = require('../PAMR')
const datasets = {
    neo: require('./datasets-16-09-17/BTC-NEO'),
    omg: require('./datasets-16-09-17/BTC-OMG'),
    eth: require('./datasets-16-09-17/BTC-ETH'),
    ltc: require('./datasets-16-09-17/BTC-LTC'),
    xrp: require('./datasets-16-09-17/BTC-XRP'),
    strat: require('./datasets-16-09-17/BTC-STRAT'),
    bch: require('./datasets-16-09-17/BTC-BCH'),
    dash: require('./datasets-16-09-17/BTC-DASH'),
    zec: require('./datasets-16-09-17/BTC-ZEC'),
    etc: require('./datasets-16-09-17/BTC-ETC')
}

const getPairsClose = (i, pairs) => pairs.map(pair => datasets[pair][i].close)
const onNewPortfolio = (bt, btplus1) => b.push(btplus1)
const getWealth = (wealth, b, x) => {
    const length = Math.min(b.length, x.length)
    const _b = b.slice(-length)
    const _x = x.slice(-length)
    for (i = length - 1; i >= 0; i--) {
        const dailyReturn = m.dot(_b[i], _x[i])
        if (dailyReturn > 0)
            wealth *= dailyReturn
    }
    return wealth
}

const runSimulation = (pamr, pairs, s, c, investedamount) => {
    const b = []
    const x = []
    b.unshift(pamr.bt)

    let i = s + c
    while (i >= s) {
        const newP = [...getPairsClose(i, pairs)]
        const oldP = [...getPairsClose(i + 1, pairs)]
        const xt = m.dotDivide(newP, oldP)
        const portfolio = pamr.rebalance(xt)
        x.unshift(xt)
        b.unshift(portfolio)
        i--
    }

    const wealth = getWealth(investedamount, b, x)
    return wealth
}

bot
    .version('1.1.0')
    .usage('<pairs....> [options]')
    .arguments('<pairs...>')
    .option('-s, --start <start>', 'specify the start datapoint (10 would be 10 datapoints from now)')
    .option('-c, --count <count>', 'specify how much datapoints should be computed')
    .option('-v, --variant <variant>', 'specify with algorithm to use (PAMR0 = 0, PAMR1 = 1, PAMR2 = 2)')
    .option('-E, --epsilon <epsilon>', 'specify the Epsilon value used by the Insensitive Loss function')
    .option('-C, --agressivity <agressivity>', 'specify the agressivity C value used by the PAMR1/2 rebalancing')
    .option('-i, --investedamount <investedamount>', 'specify the amount in BTC invested in this portfolio (recommended min is 0.05 as this allows to prevent placing orders less than 50k SAT)')
    .action((pairs, options) => {
        const s = parseInt(options.start) || 0
        const c = parseInt(options.count) || 30
        const variant = parseInt(options.variant) || 0
        const E = parseFloat(options.epsilon) || undefined
        const C = parseFloat(options.aggressivity) || 0
        const investedamount = parseFloat(options.investedamount) || 0

        const results = []

        if (typeof E !== 'number') {
            for (e = 0; e < 1; e += 0.05) {
                const initialPortfolio = Array(pairs.length).fill(0)
                const pamr = new PAMR(initialPortfolio, e, variant, C)
                const wealth = runSimulation(pamr, pairs, s, c, investedamount)
                results.push({e, wealth})
            }
        } else {
            const initialPortfolio = Array(pairs.length).fill(0)
            const pamr = new PAMR(initialPortfolio, E, variant, C)
            const wealth = runSimulation(pamr, pairs, s, c, investedamount)
            results.push({E, wealth})
        }

        console.log(results)

    })
    .parse(process.argv)
