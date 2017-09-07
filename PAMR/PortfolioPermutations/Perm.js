const m = require('mathjs')
const fs = require('fs')
const path = require('path')

const size = parseInt(process.argv[2])
const filename = process.argv[3]
const decimals = parseInt(process.argv[4]) || 2
const step = m.pow(10, decimals)
const file = fs.createWriteStream(path.join(__dirname, filename))

/* Normalize a vector from [56, 44] to [0.56, 0.44] */
const normalizeVector = (vector) => {
    return vector.map(v => v / step)
}

/* Write vector to file */
const writeVector = (vector) => {
    file.write(`${JSON.stringify(normalizeVector(vector))}${vector[0] !== step ? ',': ''}`)
}

/* Check if a given vector sums to step (eg. step = 100) */
const isValidVector = (vector) => vector.reduce((sum, v) => sum + v, 0) === step

/*
    Function to increase a vector component by step (eg 0.01)
    incrementVectorIndex([0.44, 0.56], 0, 100) => [0.45, 0.56]
*/
const incrementVectorIndex = (vector, index) => {
    for (i = 0; i <= step; i++) {
        if (index < vector.length - 1)
            incrementVectorIndex(vector, index + 1)
        vector[index] += 1
        if (isValidVector(vector)) {
            writeVector(vector)
            vector[index] = 0
            break;
        }
    }
}

/*
    Write file exports, init vector and start looping algorithm
*/
const perm = () => {
    file.write('module.exports = [')

    /* Initial vector [0, 0, 0, 0, ...] */
    let vector = Array(size).fill(0)

    incrementVectorIndex(vector, 0)


    file.write(']\n')
}

/*
    Usage: node Perm <VectorSize> <OutputFilename> [<NumberOfDecimals>]
*/
perm()
