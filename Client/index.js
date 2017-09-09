const Client = require('./Client')

//const pairs = ['BTC-BTC', 'BTC-NEO', 'BTC-LTC', 'BTC-ETH']
const pairs = JSON.parse(process.argv[2])
const bt = eval(process.argv[3])
const tradeInterval = parseInt(process.argv[4])
const investedAmount = parseFloat(process.argv[5])

const client = new Client(pairs, bt, tradeInterval, investedAmount)
