const PAMRHelper = require('./PAMRHelper')
const mathHelper = require('./mathHelper')

const PAMR = (bt, xt, E, algo = 'PAMR0', C) => {
    const ltE = PAMRHelper.insensitiveLoss(bt, xt, E)
    console.log(`ltE: ${ltE}`)
    const taut = PAMRHelper.tau[algo](ltE, xt)
    console.log(`taut: ${taut}`)
    const btplus1 = PAMRHelper.btplus1(bt, taut, xt)
    console.log(`btplus1: ${btplus1}`)
    const btplus1Normalized = mathHelper.simplex_projection(btplus1, 1)

    return btplus1Normalized
}

module.exports = PAMR
