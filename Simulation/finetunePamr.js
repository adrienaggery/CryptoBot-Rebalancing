#!/usr/bin/env node
const bot = require('commander');

const Pamr = require('../algos/Pamr');

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
  .option('-v, --variant <variant>', 'specify how much datapoints should be computed')
  .action((pairs, options) => {
    const s = parseInt(options.start) || 0;
    const c = parseInt(options.count) || 30;
    const variant = parseInt(options.variant) || 0;

    const E = 0;
    const C = 0;

    const results = [];
    const pamr = new Pamr();

    for (let E = 0; E < 1; E += 0.01) {
      for (let C = 0; C < 1000; C += 1) {

      }
    }
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
