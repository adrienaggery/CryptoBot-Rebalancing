const { insensitiveLoss, taut, btplus1 } = require('./pamr_functions')
const { simplex_projection, toFloat2 } = require('./math')

const PAMR = (bt, xt, E, algo = 'PAMR0', C) => {
    const _ltE = insensitiveLoss(bt, xt, E)
    const _taut = taut[algo](_ltE, xt, C)
    const _btplus1 = btplus1(bt, _taut, xt)
    const _btplus1Normalized = simplex_projection(_btplus1, 1)

    const _btplus1NormalizedTrimed = _btplus1Normalized.map(v => toFloat2(v))
    return _btplus1NormalizedTrimed
}

module.exports = PAMR
