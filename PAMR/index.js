const { insensitiveLoss, taut, btplus1 } = require('./pamr_functions')
const { simplex_projection } = require('./math')

const PAMR = (bt, xt, E, algo = 'PAMR0', C) => {
    const ltE = insensitiveLoss(bt, xt, E)
    const taut = taut[algo](ltE, xt, C)
    const btplus1 = btplus1(bt, taut, xt)
    const btplus1Normalized = simplex_projection(btplus1, 1)

    return btplus1Normalized
}

module.exports = PAMR
