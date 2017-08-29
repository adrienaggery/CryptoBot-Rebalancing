const A2S1 = require('./A2S1')
const A2S2 = require('./A2S2')
const A4S1 = require('./A4S1')
const A4S2 = require('./A4S2')

const indexed = [
    [], [], [
        null,
        A2S1, /* indexed[2][1] */
        A2S2 /* indexed[2][2] */
    ], [], [
        null,
        A4S1, /* indexed[4][1] */
        A4S2 /* indexed[4][2] */
    ]
]

const all = {
    A2S1,
    A2S2,
    A4S1,
    A4S2
}
module.exports = {
    indexed,
    all
}
