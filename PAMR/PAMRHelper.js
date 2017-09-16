const m = require('mathjs')
const mathHelper = require('./mathHelper')

const insensitiveLoss = (bt, xt, E = 1) => Math.max(0, m.dot(bt, xt) - E)

const tau0 = (insensitiveLoss, xt) => {
    const denominator = m.pow(m.norm(m.subtract(xt, mathHelper.vectorAverage(xt))), 2)
    if (denominator === 0)
        return 0
    return insensitiveLoss / m.pow(m.norm(m.subtract(xt, mathHelper.vectorAverage(xt))), 2)
}

const tau = {
    PAMR0: tau0
}

const btplus1 = (bt, tt, xt) => m.subtract(bt, m.multiply(tt, m.subtract(xt, mathHelper.vectorAverage(xt))))

module.exports = {
    insensitiveLoss,
    tau,
    btplus1
}
