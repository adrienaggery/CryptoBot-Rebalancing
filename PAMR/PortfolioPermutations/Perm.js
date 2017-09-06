// Check if a given vector sums to 1 (using step)
const isValidVector = (vector, step) => vector.reduce((sum, v) => sum + v, 0) === step
/*
    function to increase a vector component by step (eg 0.01)
    incrementVectorIndex([0.44, 0.56], 0, 100) => [0.45, 0.56]
*/
const incrementVectorIndex = (vector, index, step) => {}

const perm = (size, filename, decimals = 2) => {
    const step = m.pow(10, decimals)
    const file = fs.createWriteStream(path.join(__dirname, filename))

    file.write('module.exports = [')

    // Create initial [0, 0, 0, 0, ...]
    let vector = Array(size).fill(0)

    /*
        Find some way to loop and test each vector with isValidVector()
        If valid, then file.write(vector) and continue
    */

    file.write(']')
}

const size = parseInt(process.argv[2])
const filename = process.argv[3]
const decimals = parseInt(process.argv[4]) || undefined

perm(size, filename, decimals)

// Usage: node Perm <VectorSize> <OutputFilename> [<NumberOfDecimals>]
