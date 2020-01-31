/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
    let factorial = 1;

    for(var i = 2; i <= n; i++) {
        factorial *= i;
    }

    return factorial;
}
