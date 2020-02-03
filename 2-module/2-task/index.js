/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
    if (!obj) return true;

    for(let prop in obj) {
        return false;
    }

    return true;
}
