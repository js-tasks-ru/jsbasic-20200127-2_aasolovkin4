/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
    let salarySum = 0;

    if (!salaries) return salarySum;

    for(let salaryProp in salaries) {
        if (typeof salaries[salaryProp] == "number") {
            salarySum += salaries[salaryProp];
        }
    }

    return salarySum;
}
