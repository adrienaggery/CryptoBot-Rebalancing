const fs = require('fs')
const path = require('path')
const m = require('mathjs')

const recursive = (size, decimals = 2) => {
    const step = m.pow(10, decimals)

    return (function recursive(permutations) {
        if (permutations[0].length === size) {
            // End of recursive, so map 0-STEP values to 0.0-1.0
            return permutations.filter(t => t.reduce((a, b) => a + b, 0) === step).map(t => t.map(i => i / step));
        }

        /* Calculate each permutation which sum <= STEP */
        const newPermutations = [];
        for (let i = 0; i <= step; i++) {
            permutations.filter(permutation => permutation.reduce((a, b) => a + b, i) <= step).forEach(permutation => newPermutations.push([i].concat(permutation)));
        }

        return recursive(newPermutations);
    }([[]])); /* Start with empty array [] */
}

const iterative = (size, filename, decimals = 2) => {
    const step = m.pow(10, decimals)
    const file = fs.createWriteStream(path.join(__dirname, filename))

    file.write('module.exports = [')

    // start with 0-size vector, so one empty array
    let permutations = [[]];
    let newPermutations = [];

    // create permutations of given size
    for (let i = 0; i < size; i++) {
      // 0 to 10 (will be mapped to 0.0 to 1.0)
      for (let j = 0; j <= step; j++) {
        // iterate over each current permutation
        outer:
        for (let k = permutations.length - 1; k >= 0; k--) {
          const permutation = permutations[k];
          // check if we can add a value
          let sum = j;
          for (let l = permutation.length - 1; l >= 0; l--) {
            sum += permutation[l];
            if (sum > step) {
              // vector sum exceeds maximum
              continue outer;
            }
          }
          // add this new vector
          if ([j].concat(permutation).length === size)
          newPermutations.push([j].concat(permutation));
        }
      }
      // permutations contains the current set of vector
      permutations = newPermutations;
      // newPermutations will contain the next set
      newPermutations = [];
    }

    // filter invalid vectors which sum is not 10 (then mapped to 1.0)
    for (let i = 0; i < permutations.length; i++) {
      const permutation = permutations[i];
      let sum = 0;
      for (let j = 0; j < permutation.length; j++) {
        // calc sum
        sum += permutation[j];
        // and map 0 - 10 to 0.0 - 1.0
        permutation[j] /= step;
      }
      if (sum === step) {
        console.log(permutation)
        newPermutations.push(permutation);
      }
    }

    return newPermutations;
}

const method = {
    recursive,
    iterative
}
const size = parseInt(process.argv[3])
const output = process.argv[4]
const decimals = parseInt(process.argv[4]) || undefined
const b = method[process.argv[2]](size, output, decimals)
console.log(JSON.stringify(b))
