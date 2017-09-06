package main

import "fmt"
import "math"
import "os"

func round(num float64) int {
    return int(num + math.Copysign(0.5, num))
}

func toFixed(num float64, precision int) float64 {
    output := math.Pow(10, float64(precision))
    return float64(round(num * output)) / output
}

func main() {
    step := 0.01
    var results[8]float64
    file, fileErr := os.Create("results")
    if fileErr != nil {
        fmt.Println(fileErr)
        return
    }

    fmt.Fprintf(file, "module.exports = [")
    for results[0] = 0 ; results[0] <= 1 ; results[0] = results[0] + step {
        for results[1] = 0 ; results[1] <= 1 ; results[1] = results[1] + step {
            for results[2] = 0 ; results[2] <= 1 ; results[2] = results[2] + step {
                for results[3] = 0 ; results[3] <= 1 ; results[3] = results[3] + step {
                    for results[4] = 0 ; results[4] <= 1 ; results[4] = results[4] + step {
                        for results[5] = 0 ; results[5] <= 1 ; results[5] = results[5] + step {
                            for results[6] = 0 ; results[6] <= 1 ; results[6] = results[6] + step {
                                for results[7] = 0 ; results[7] <= 1 ; results[7] = results[7] + step {
                                    if toFixed(results[0], 2) + toFixed(results[1], 2) + toFixed(results[2], 2) + toFixed(results[3], 2) + toFixed(results[4], 2) + toFixed(results[5], 2) + toFixed(results[6], 2) + toFixed(results[7], 2) == 1 {
                                        fmt.Fprintf(file, "%.2f,", results)
                                    }
                                }
                                results[7] = 0
                            }
                            results[6] = 0
                        }
                        results[5] = 0
                    }
                    results[4] = 0
                }
                results[3] = 0
            }
            results[2] = 0
        }
        results[1] = 0
    }
    fmt.Fprintf(file, "]")
}