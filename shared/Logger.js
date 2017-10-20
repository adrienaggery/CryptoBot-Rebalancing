/* eslint-disable no-unused-vars */
const colors = require('colors');
/* eslint-enable no-unused-vars */

const log = (type, message, debugLevel) => {
  if ((!process.env.debugLevel && debugLevel <= 2) || debugLevel <= process.env.debugLevel) {
    const time = `[${new Date().toLocaleTimeString()}]`;
    console.log(time, type, message);
  }
};

const debug = (message, debugLevel = 3) => {
  const type = '[Debug]'.black.bgWhite;
  log(type, message, debugLevel);
};

const info = (message, debugLevel = 2) => {
  const type = '[Info]'.black.bgWhite;
  log(type, message, debugLevel);
};

const success = (message, debugLevel = 2) => {
  const type = '[Success]'.black.bgGreen;
  log(type, message, debugLevel);
};

const warning = (message, debugLevel = 1) => {
  const type = '[Warning]'.black.bgYellow;
  log(type, message, debugLevel);
};

const error = (message, debugLevel = 1) => {
  const type = '[Error]'.black.bgRed;
  log(type, message, debugLevel);
};

const buy = (message, debugLevel = 1) => {
  const type = '[Buy]'.black.bgGreenl;
  log(type, message, debugLevel);
};

const sell = (message, debugLevel = 1) => {
  const type = 'Sell'.black.bgRed;
  log(type, message, debugLevel);
};

module.exports = {
  debug,
  info,
  success,
  warning,
  error,
  buy,
  sell,
};
