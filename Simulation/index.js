#!/usr/bin/env node
const m = require('mathjs')
const bot = require('commander')

const Client = require('../Client/Client')
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

var b = []
var x = []

const getPairsClose = (i, pairs) => pairs.map(pair => datasets[pair][i].close)
const onNewPortfolio = (bt, btplus1) => b.push(btplus1)
const getWealth = (b, x, wealth) => {
    const length = Math.min(b.length, x.length)
    for (i = 0; i < length; i++) {
        wealth *= m.dot(b[i], x[i])
    }
    return wealth
}

bot
    .version('1.1.0')
    .usage('<pairs....> [options]')
    .arguments('<pairs...>')
    .option('-s, --start <start>', 'specify the start datapoint (10 would be 10 datapoints from now)')
    .option('-c, --count <count>', 'specify how much datapoints should be computed')
    .option('-a, --algo <algo>', 'specify with algorithm to use (PAMR0, PAMR1, PAMR2)')
    .option('-e, --epsilon <epsilon>', 'specify the Epsilon value used by the Insensitive Loss function')
    .option('-C, --agressivity <agressivity>', 'specify the agressivity C value used by the PAMR1/2 rebalancing')
    .option('-i, --investedamount <investedamount>', 'specify the amount in BTC invested in this portfolio (recommended min is 0.05 as this allows to prevent placing orders less than 50k SAT)')
    .action((pairs, options) => {
        const s = parseInt(options.start) || 0
        const c = parseInt(options.count) || 30
        const algo = options.algo
        const E = parseFloat(options.epsilon) || 0.98
        const C = parseFloat(options.aggressivity) || 0
        const investedamount = parseFloat(options.investedamount) || 0

        initialPortfolio = Array(pairs.length + 1).fill(1).fill(0, 1)
        b.push(initialPortfolio)

        const client = new Client(initialPortfolio, E, onNewPortfolio, algo, C)

        let i = s + c
        while (i >= s) {
            const oldP = [1, ...getPairsClose(i + 1, pairs)]
            const newP = [1, ...getPairsClose(i, pairs)]
            const xt = m.dotDivide(newP, oldP)
            x.push(xt)
            client.receiveNewPrices(newP, oldP)
            i--
        }

        const wealth = getWealth(b, x, investedamount)
        console.log(wealth)
    })
    .parse(process.argv)
