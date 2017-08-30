const m = require('mathjs')

const permutations = (size, decimals = 2) => {
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

const b = permutations(parseInt(process.argv[2]), parseInt(process.argv[3]))
console.log(JSON.stringify(b))
