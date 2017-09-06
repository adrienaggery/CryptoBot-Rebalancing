package main

import "fmt"
import "math"
import "os"
import "strconv"

func round(num float64) int {
    return int(num + math.Copysign(0.5, num))
}

// Arrondit avec *precision* décimales (pour éviter les erreurs de mauvais arrondis du langage)
func toFixed(num float64, precision int) float64 {
    output := math.Pow(10, float64(precision))
    return float64(round(num * output)) / output
}

// Cette fonction transforme un tableau d'int en une string, avec chaque élément séparé par une virgule
// Problème : on a un tableau de float64 en entrée
func sqlFloatSeq(ns [8]float64) string {
	if len(ns) == 0 {
		return ""
	}

	// Appr. 3 chars per num plus the comma.
	estimate := len(ns) * 4
	b := make([]byte, 0, estimate)
	b = append(b, '[')
	for _, n := range ns {
		b = strconv.AppendFloat(b, float64(n), 10) // La fonction originale ici était : strconv.AppendInt(b, int64(n), 10) ; il faut la convertir en Float
		b = append(b, ',')
	}
	b = b[:len(b)-1]
	b = append(b, ']')
	return string(b)
}

func main() {
    step := 0.01
    var results[8]float64
    var outputString string = "module.exports = ["
    file, fileErr := os.Create("A8S2.js")
    if fileErr != nil {
        fmt.Println(fileErr)
        return
    }

    for results[0] = 0 ; results[0] <= 1 ; results[0] = results[0] + step {
        for results[1] = 0 ; results[1] <= 1 ; results[1] = results[1] + step {
            for results[2] = 0 ; results[2] <= 1 ; results[2] = results[2] + step {
                for results[3] = 0 ; results[3] <= 1 ; results[3] = results[3] + step {
                    for results[4] = 0 ; results[4] <= 1 ; results[4] = results[4] + step {
                        for results[5] = 0 ; results[5] <= 1 ; results[5] = results[5] + step {
                            for results[6] = 0 ; results[6] <= 1 ; results[6] = results[6] + step {
                                for results[7] = 0 ; results[7] <= 1 ; results[7] = results[7] + step {
                                     if toFixed(results[0], 2) + toFixed(results[1], 2) + toFixed(results[2], 2) + toFixed(results[3], 2) + toFixed(results[4], 2) + toFixed(results[5], 2) + toFixed(results[6], 2) + toFixed(results[7], 2) == 1 {
                                        outputString = outputString + sqlFloatSeq(results) + ","
                                    //    fmt.Printf("%s", outputString)
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
    sz := len(outputString)
    outputString = outputString[:sz-1]
    outputString = outputString + "]"
    fmt.Fprintf(file, outputString)
}