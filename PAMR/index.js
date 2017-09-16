const mathHelper = require('./mathHelper')

const PAMR = (bt, xt, E, algo = 'PAMR0', C) => {
    const ltE = PAMRHelper.insensitiveLoss(bt, xt, E)
    const tau = PAMRHelper.tau[algo](ltE, xt)
    const btplus1 = PAMRHelper.btplus1(bt, tau, xt)
    const btplus1Normalized = mathHelper.simplex_projection(btplus1, 1)

    return btplus1Normalized
}

module.exports = PAMR
