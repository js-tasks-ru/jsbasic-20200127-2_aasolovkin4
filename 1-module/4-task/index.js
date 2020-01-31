/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
    let checkedStr = (str || "").toLowerCase();

    return !!(checkedStr && (checkedStr.includes("1xbet") || checkedStr.includes("xxx")));
}
