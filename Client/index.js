const Client = require('./Client')

const pairs = ['BTC-BTC', 'BTC-NEO', 'BTC-LTC', 'BTC-STRAT']
const bt = eval(process.argv[2])
const xt = eval(process.argv[3])
const E = parseFloat(process.argv[4])

const client = new Client(bt, pairs)

client.receivePricesMovement(xt)
