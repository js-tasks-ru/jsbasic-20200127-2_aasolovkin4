/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
    return (str || '')
        .split("-")
        .map((item, index, arr) => !item ? '' : index === 0 ? (item[0].toLowerCase() + item.slice(1)) : (item[0].toUpperCase() + item.slice(1)))
        .join('');
}
