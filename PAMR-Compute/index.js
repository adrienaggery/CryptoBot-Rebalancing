const m = require('mathjs')

const currentPortfolio = eval(process.argv[2])
const currentPriceRelatives = eval(process.argv[3])

const portfolioScore = (b, bt) => 0.5 * m.pow(m.norm(m.subtract(b, bt)), 2)
const insensitiveLoss = (b, xt, E = 1) => {
    const dot = m.dot(b, xt)
    return (dot <= E ? 0 : dot - E)
}

const createPermutations = (size) => {
  return (function recursive(permutations) {
    if (permutations[0].length === size) {
      // end of recursive, so map 0-10 values to 0.0-1.0
      return permutations.filter(t => t.reduce((a, b) => a + b, 0) === 100)
                         .map(t => t.map(i => i / 100));
    }

    // calculate each permutation which sum <= 10
    const newPermutations = [];
    for (let i = 0; i <= 100; i++) {
      permutations.filter(permutation => permutation.reduce((a, b) => a + b, i) <= 100)
                  .forEach(permutation => newPermutations.push([i].concat(permutation)));
    }

    return recursive(newPermutations);
  }([[]])); // start with empty array []
}

const findBestPortfolio = (bt, xt, slack, C) => {
    const permutations = createPermutations(bt.length)
    const bestPortfolio = permutations.reduce((acc, b) => {
        if (insensitiveLoss(b, xt) === 0) {
            const score = portfolioScore(b, bt)
            if (!acc.score || score < acc.score) {
                acc.portfolio = b
                acc.score = score
            }
        }
        return acc
    }, {})

    console.log(bestPortfolio)
}

findBestPortfolio(currentPortfolio, currentPriceRelatives)
