#!/usr/bin/env node

const bot = require('commander')
const Bittrex = require('../Shared/Bittrex')
const Client = require('./Client')

bot
    .version('1.1.0')
    .usage('<pairNames> <initialPortfolio> [options]')
    .arguments('<pairNames> <initialPortfolio>')
    .option('-e --epsilon [epsilon]', 'specify the Epsilon value used by the Insensitive Loss function', parseFloat, 0.98)
    .option('-C --agressivity [agressivity]', 'specify the agressivity C value used by the PAMR1/2 rebalancing', parseFloat, 0)
    .option('-t --tradeinterval [tradeInterval]', 'specify the interval between each price update and rebalancing', parseInt, 14400000)
    .option('-i --investedamount [investedAmount]', 'specify the amount in BTC invested in this portfolio', parseFloat, 0)
    .action((pairNames, initialPortfolio, command) => {
        pairNames = eval(pairNames)
        initialPortfolio = eval(initialPortfolio)

        const client = new Client(initialPortfolio, command.epsilon, Bittrex.rebalancePortfolio.bind(command.investedAmount, pairNames))

        Bittrex.getLastPrices(pairNames, (err, res) => client.receiveNewPrices(res))
        setInterval(() => {
            Bittrex.getLastPrices(pairNames, (err, res) => client.receiveNewPrices(res))
        }, command.tradeInterval)
    })
    .parse(process.argv)
