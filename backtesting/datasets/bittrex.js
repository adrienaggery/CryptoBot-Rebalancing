const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const fetch = require('node-fetch');
const moment = require('moment');
const commander = require('commander');

const formatBittrexResult = result => result.map(candle => ({
  timestamp: Date.parse(candle.T),
  open: candle.O,
  high: candle.H,
  low: candle.L,
  close: candle.C,
  volume: candle.V,
}));

const createDataset = (pair, interval) => {
  const url = `https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName=${pair}&tickInterval=${interval}`;
  fetch(url)
    .then(res => res.json())
    .then((json) => {
      if (json.success) {
        mkdirp(path.join(__dirname, `${interval}/${moment().format('DD-MM-YYYY')}`), (err) => {
          if (err) console.error(err);
          else {
            const buffer = `module.exports = JSON.parse('${JSON.stringify(formatBittrexResult(json.result).reverse())}');`;
            fs.writeFile(path.join(__dirname, `${interval}/${moment().format('DD-MM-YYYY')}/${pair}.js`), buffer, (err) => {
              if (err) console.error(err);
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

commander
  .version('1.0.0')
  .usage('<pairs...> [options]')
  .arguments('<pairs...>')
  .option('-i --interval <interval>', 'specify the tickInterval that will be passed to bittrex API. (oneMin, fiveMin, thirtyMin, hour, day)')
  .action((pairs, options) => {
    pairs.forEach((pair) => {
      createDataset(pair, options.interval);
    });
  })
  .parse(process.argv);
