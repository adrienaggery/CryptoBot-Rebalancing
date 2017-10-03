const fs = require('fs');
const commander = require('commander');

const Logger = require('../../shared/Logger');
const Pamr = require('../../algos/Pamr');

/* eslint-disable */
const datasets = {
  neo: require('../datasets/16-09-17/BTC-NEO'),
  omg: require('../datasets/16-09-17/BTC-OMG'),
  eth: require('../datasets/16-09-17/BTC-ETH'),
  ltc: require('../datasets/16-09-17/BTC-LTC'),
  xrp: require('../datasets/16-09-17/BTC-XRP'),
  strat: require('../datasets/16-09-17/BTC-STRAT'),
  bch: require('../datasets/16-09-17/BTC-BCH'),
  dash: require('../datasets/16-09-17/BTC-DASH'),
  zec: require('../datasets/16-09-17/BTC-ZEC'),
  etc: require('../datasets/16-09-17/BTC-ETC')
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
  .usage('<pairs....> [options]')
  .arguments('<pairs...>')
  .option('-s, --start <start>', 'specify the start datapoint (10 would be 10 datapoints from now)')
  .option('-c, --count <count>', 'specify how much datapoints should be computed')
  .option('-v, --variant <variant>', 'specify how much datapoints should be computed')
  .action((pairs, options) => {
    const s = parseInt(options.start, 10) || 0;
    const c = parseInt(options.count, 10) || 30;
    const variant = parseInt(options.variant, 10) || 0;

    const batch = generateBatch(s, c, pairs);
    const results = [];

    for (let E = 0; E < 1; E += 0.01) {
      for (let C = (variant > 0 ? 0 : 1000); C <= 1000; C += 5) {
        const pamr = new Pamr(pairs.length, variant, E, C);
        pamr.runBatch(batch);
        const wealth = pamr.computeWealth(1);
        results.push({
          E, C, wealth,
        });
      }
    }

    fs.writeFile(`./results/Pamr${variant}-${s}-${c}.json`, JSON.stringify(results), (err) => {
      if (err) { return console.error(`Failed to save results. ${err}`); }
      return console.log('Saved results file.');
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
