const fs = require('fs');
const commander = require('commander');

const Logger = require('../../shared/Logger');
const Olmar = require('../../algos/Olmar');

/* eslint-disable */
const datasets = {
  neo: require('../datasets/hour/04-10-2017/BTC-NEO'),
  omg: require('../datasets/hour/04-10-2017/BTC-OMG'),
  eth: require('../datasets/hour/04-10-2017/BTC-ETH'),
  ltc: require('../datasets/hour/04-10-2017/BTC-LTC'),
  xrp: require('../datasets/hour/04-10-2017/BTC-XRP'),
  strat: require('../datasets/hour/04-10-2017/BTC-STRAT'),
  dash: require('../datasets/hour/04-10-2017/BTC-DASH'),
  zec: require('../datasets/hour/04-10-2017/BTC-ZEC'),
  etc: require('../datasets/hour/04-10-2017/BTC-ETC')
};
/* eslint-enable */

const generateBatch = (s, c, pairs) => {
  const batch = [];
  for (let i = s; i < s + c; i += 1) {
    batch.push(pairs.map(pair => datasets[pair][i].close));
  }
  return batch;
};

commander
  .version('2.0.0')
  .usage('<pairs...> [options]')
  .arguments('<pairs...>')
  .option('-s, --start <start>', 'specify the start datapoint (10 would be 10 datapoints from now)')
  .option('-c, --count <count>', 'specify how much datapoints should be computed')
  .action((pairs, options) => {
    const s = parseInt(options.start, 10) || 0;
    const c = parseInt(options.count, 10) || 30;

    const batch = generateBatch(s, c, pairs);
    const results = [];

    for (let E = 1; E < 100; E += 1) {
      console.log(E);
      for (let window = 1; window <= 20; window += 1) {
        const olmar = new Olmar(pairs.length, window, E);
        olmar.runBatch(batch);
        const wealth = olmar.computeWealth(1);
        results.push({
          window, E, wealth,
        });
        if (E === -1) {
          console.log(batch);
          console.log(olmar.X, olmar.B);
        }
      }
    }

    fs.writeFile(`./results/Olmar-${s}-${c}.json`, JSON.stringify(results), (err) => {
      if (err) { return console.error(`Failed to save results. ${err}`); }
      return null;
    });

    const best = results.reduce((mem, current) => {
      if (!mem || current.wealth > mem.wealth) {
        return current;
      }
      return mem;
    });

    Logger.success(`Best settings for that timeperiod is ${JSON.stringify(best)}.`, 0);
  })
  .parse(process.argv);
