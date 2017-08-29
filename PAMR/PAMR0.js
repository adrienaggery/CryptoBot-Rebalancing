const m = require('mathjs')

const Helper = require('./Helper')
/* Change this according to portfolio size and desired step */
const portfolios = require('./PortfolioPermutations/A2S1')

const _portfolioScore = (b, bt) => 0.5 * m.pow(m.norm(m.subtract(b, bt)), 2)

const PAMR0 = (bt, xt) => {
    const bestPortfolio = portfolios.reduce((acc, b) => {
        if (Helper.insensitiveLoss(b, xt) === 0) {
            const score = _portfolioScore(b, bt)
            if (!acc.score || score < acc.score) {
                acc.portfolio = b
                acc.score = score
            }
        }
        return acc
    }, { portfolio: bt })

    return bestPortfolio.portfolio
}

module.exports = PAMR0
