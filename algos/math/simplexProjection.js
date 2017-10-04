const mathjs = require('mathjs');
const clip = require('./clip');

const simplexProjection = (y) => {
  if (!Array.isArray(y)) {
    throw new TypeError(`Argument 'y' should be of type array, but got ${typeof y} instead.`);
  }

  const m = y.length;
  const s = y.slice().sort((a, b) => b - a);

  let bget = false;
  let tmpsum = 0;
  let tmax;
  for (let ii = 0; ii < m - 1; ii += 1) {
    tmpsum += s[ii];
    tmax = (tmpsum - 1) / (ii + 1);
    if (tmax >= s[ii + 1]) {
      bget = true;
      break;
    }
  }

  if (!bget) {
    tmax = (tmpsum + (s[m - 1] - 1)) / m;
  }


  return clip(mathjs.subtract(y, tmax), { min: 0 });
};

module.exports = simplexProjection;
