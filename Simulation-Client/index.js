const m = require('mathjs')

const neo = require('./datasets/BTC-NEO')
const ltc = require('./datasets/BTC-LTC')
const strat = require('./datasets/BTC-STRAT')

const Client = require('../Client/Client')

let b = [[0.25, 0.25, 0.25, 0.25]]
let x = []
const length = 90

const onNewPortfolio = (bt) => {
    b.push(bt)
}

const getWealth = (b, x, wealth = 2) => {
    const length = Math.min(b.length, x.length)
    for (i = 0; i < length; i++) {
        wealth *= m.dot(b[i], x[i])
    }
    console.log(wealth)
}

const hammer = new Client([0.25, 0.25, 0.25, 0.25], ['BTC-BTC', 'BTC-NEO', 'BTC-LTC', 'BTC-STRAT'], onNewPortfolio)

for (i = length - 2; i >= 0; i--) {
    //console.log(ltc[i],  ltc[i+1])
    const xt = m.dotDivide([1, neo[i].close, ltc[i].close, strat[i].close], [1, neo[i+1].close, ltc[i+1].close, strat[i+1].close])
    x.push(xt)
    hammer.receivePricesMovement(xt)
}

getWealth(b, x)
