/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
    return data
        .filter((person) => person.age <= age)
        .map((person) => `${person.name}, ${person.balance}`)
        .join('\n');
}
