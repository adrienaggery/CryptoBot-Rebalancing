const PAMR = require('../PAMR')

const bt = eval(process.argv[2])
const xt = eval(process.argv[3])

const b = PAMR.PAMR0(bt, xt)

console.log(b)
