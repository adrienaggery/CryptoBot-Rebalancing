const insensitiveLoss = require('./insensitiveLoss')
const taut0 = require('./taut0')
const taut1 = require('./taut1')
const btplus1 = require('./btplus1')

module.exports = {
    insensitiveLoss,
    taut: [
        taut0,
        taut1
    ],
    btplus1
}
