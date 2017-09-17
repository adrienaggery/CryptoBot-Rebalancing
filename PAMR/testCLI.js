const PAMR = require('./index')

const bt = JSON.parse(process.argv[2])
const xt = JSON.parse(process.argv[3])
const E = parseFloat(process.argv[4])
const algo = process.argv[5]
const C = parseFloat(process.argv[6])

const newPortfolio = PAMR(bt, xt, E, algo, C)
console.log(`New Portfolio ${newPortfolio}`)
