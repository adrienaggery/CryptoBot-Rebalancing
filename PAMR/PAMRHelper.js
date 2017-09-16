const m = require('mathjs')
const mathHelper = require('./mathHelper')

const insensitiveLoss = (bt, xt, E = 1) => Math.max(0, m.dot(bt, xt) - E)

const tau = {
    PAMR0: (insensitiveLoss, xt) => insensitiveLoss / m.pow(m.norm(m.subtract(xt, mathHelper.vectorAverage(xt))), 2)
}

const btplus1 = (bt, tt, xt) => m.subtract(bt, m.multiply(tt, m.subtract(xt, mathHelper.vectorAverage(xt))))

module.exports = {
    insensitiveLoss,
    tau,
    btplus1
}
